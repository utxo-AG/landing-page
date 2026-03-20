import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

async function waitForImages(el: HTMLElement) {
  const images = el.querySelectorAll("img");
  await Promise.all(
    Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        img.addEventListener("load", () => resolve(), { once: true });
        img.addEventListener("error", () => resolve(), { once: true });
      });
    })
  );
}

async function toBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function inlineSvgImages(container: HTMLElement) {
  const svgImages = container.querySelectorAll("svg image");
  const cache = new Map<string, string>();

  await Promise.all(
    Array.from(svgImages).map(async (img) => {
      const href =
        img.getAttribute("href") ||
        img.getAttributeNS("http://www.w3.org/1999/xlink", "href");
      if (!href || href.startsWith("data:")) return;

      try {
        let base64 = cache.get(href);
        if (!base64) {
          base64 = await toBase64(href);
          cache.set(href, base64);
        }
        img.setAttribute("href", base64);
      } catch {
        // silently skip images that fail to load
      }
    })
  );
}

export async function generatePitchPdf(
  container: HTMLElement,
  filename = "utxo-AG-deck.pdf",
  onProgress?: (current: number, total: number) => void
) {
  const sections = container.querySelectorAll<HTMLElement>(":scope > section");
  if (sections.length === 0) return;

  onProgress?.(0, sections.length);

  // Pre-process: inline all SVG <image> hrefs as base64 data URLs
  await inlineSvgImages(container);

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [vw, vh],
  });

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    onProgress?.(i + 1, sections.length);

    section.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    await waitForImages(section);
    await new Promise((r) => setTimeout(r, 200));

    const canvas = await html2canvas(section, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      width: vw,
      height: vh,
      scrollX: 0,
      scrollY: 0,
      windowWidth: vw,
      windowHeight: vh,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.92);

    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, 0, vw, vh);
  }

  pdf.save(filename);
}
