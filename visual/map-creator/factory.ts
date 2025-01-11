const domParser = new DOMParser()

export function createFactory(angle = 0): HTMLElement {
  return domParser.parseFromString(
    `
    <div kind="factory" class="size-var">
      <div class="factory" event-catcher></div>
      <div kind="factory-arrow" style="rotate: ${angle}deg;">
        <div class="factory-arrow" event-catcher></div>
      </div>
    </div>
    `,
    'text/html'
  ).body.children[0] as HTMLElement
}