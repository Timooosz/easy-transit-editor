import type { t_transitData } from "../types/types";
import { getCurrentTheme } from "./themes.svelte";

export const downloadJsonData = (transitData: t_transitData) => {
  const jsonString = JSON.stringify(transitData);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'map.json';
  link.click();
  URL.revokeObjectURL(url);
}

export const exportSvgComponent = (svgElement: SVGElement) => {
  const clonedSvg = svgElement.cloneNode(true) as SVGElement;

  const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  bg.setAttribute("x", "0");
  bg.setAttribute("y", "0");
  bg.setAttribute("width", "100%");
  bg.setAttribute("height", "100%");
  bg.setAttribute("fill", `${getCurrentTheme().download_bg}`);
  clonedSvg.prepend(bg);
  
  const rect = svgElement.getBoundingClientRect();
  clonedSvg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
  clonedSvg.setAttribute('width', String(rect.width));
  clonedSvg.setAttribute('height', String(rect.height));
  
  clonedSvg.style.pointerEvents = 'auto';
  
  const svgString = new XMLSerializer().serializeToString(clonedSvg);
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'map.svg';
  link.click();
  URL.revokeObjectURL(url);
}

export const uploadJsonData = async () => {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "accept";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve(null);
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          resolve(data);
        } catch (error) {
          alert("An error occured uploading the file.");
          resolve(null);
        }
      };
      fileReader.readAsText(file);
    };

    input.click();
  });
}