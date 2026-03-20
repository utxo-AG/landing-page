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

export async function generatePitchPdf(
  container: HTMLElement,
  filename = "utxo-AG-deck.pdf",
  onProgress?: (current: number, total: number) => void
) {
  const sections = container.querySelectorAll<HTMLElement>(":scope > section");
  if (sections.length === 0) return;

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
    await new Promise((r) => setTimeout(r, 150));

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
