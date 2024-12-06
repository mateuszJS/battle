const domParser = new DOMParser()
const mapIndexToPosition = ['top', 'right', 'bottom', 'left']
// export const testId = {
//   value: 0
// }
/*for generating html to paste them i ntest, please use test ids for anchor points:
<span class="anchor-point" data-test="${testId.value++}"></span>
<span class="anchor-point" data-test="${testId.value++}"></span>
*/
export function createPlatform(): HTMLElement {
  return domParser.parseFromString(
    `
    <div kind="platform" class="platform-vars">
      <div event-catcher class="octagon">
        <div class="octagon octagon-inner platform-vars">
        </div>
      </div>
      ${Array.from({ length: 4 }, (_, i) => (`
        <span
          kind="bridge-edge"
          reproduce
          class="platform-vars ${
            i % 2 ? 'bridge-edge-verticlar' : 'bridge-edge-horizontal'
          } bridge-edge-${mapIndexToPosition[i]}"
        >
          <div event-catcher></div>
          <span class="anchor-point"></span>
          <span class="anchor-point"></span>
        </span>
      `)).join('')}
    </div>
    `,
    'text/html'
  ).body.children[0] as HTMLElement
}