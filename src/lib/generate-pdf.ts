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

const PDF_WIDTH = 1600;
const PDF_HEIGHT = 900;

export async function generatePitchPdf(
  container: HTMLElement,
  filename = "utxo-AG-deck.pdf",
  onProgress?: (current: number, total: number) => void
) {
  const sections = container.querySelectorAll<HTMLElement>(":scope > section");
  if (sections.length === 0) return;

  onProgress?.(0, sections.length);

  await inlineSvgImages(container);

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [PDF_WIDTH, PDF_HEIGHT],
  });

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    onProgress?.(i + 1, sections.length);

    const original = {
      width: section.style.width,
      height: section.style.height,
      minHeight: section.style.minHeight,
      maxHeight: section.style.maxHeight,
    };
    section.style.width = `${PDF_WIDTH}px`;
    section.style.height = `${PDF_HEIGHT}px`;
    section.style.minHeight = `${PDF_HEIGHT}px`;
    section.style.maxHeight = `${PDF_HEIGHT}px`;

    section.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    await waitForImages(section);
    await new Promise((r) => setTimeout(r, 200));

    const canvas = await html2canvas(section, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      width: PDF_WIDTH,
      height: PDF_HEIGHT,
      scrollX: 0,
      scrollY: 0,
      windowWidth: PDF_WIDTH,
      windowHeight: PDF_HEIGHT,
    });

    section.style.width = original.width;
    section.style.height = original.height;
    section.style.minHeight = original.minHeight;
    section.style.maxHeight = original.maxHeight;

    const imgData = canvas.toDataURL("image/jpeg", 0.92);

    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, 0, PDF_WIDTH, PDF_HEIGHT);
  }

  pdf.save(filename);
}
