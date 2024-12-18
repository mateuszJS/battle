import Bridge from "map-creator/bridge/Bridge"
import serializeMap from "."

jest.mock('map-creator/bridge');

let mapEl: HTMLElement;
describe("serialize map", () => {
  beforeAll(() => {
    const domParser = new DOMParser()
    const document = domParser.parseFromString(`
      <main>
        <div
          kind="platform"
          class="platform-vars"
          style="top: 153px; left: 88px; pointer-events: auto"
        >
          <div event-catcher="" class="octagon">
            <div class="octagon octagon-inner platform-vars"></div>
          </div>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-horizontal bridge-edge-top"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="0"></span>
            <span class="anchor-point" data-test="1"></span>
          </span>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-verticlar bridge-edge-right"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="2"></span>
            <span class="anchor-point" data-test="3"></span>
          </span>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-horizontal bridge-edge-bottom"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="4"></span>
            <span class="anchor-point" data-test="5"></span>
          </span>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-verticlar bridge-edge-left"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="6"></span>
            <span class="anchor-point" data-test="7"></span>
          </span>
        </div>
        <div
          kind="platform"
          class="platform-vars"
          style="top: 521px; left: 348px; pointer-events: auto"
        >
          <div event-catcher="" class="octagon">
            <div class="octagon octagon-inner platform-vars"></div>
          </div>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-horizontal bridge-edge-top"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="50"></span>
            <span class="anchor-point" data-test="51"></span>
          </span>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-verticlar bridge-edge-right"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="10"></span>
            <span class="anchor-point" data-test="11"></span>
          </span>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-horizontal bridge-edge-bottom"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="12"></span>
            <span class="anchor-point" data-test="13"></span>
          </span>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-verticlar bridge-edge-left"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="14"></span>
            <span class="anchor-point" data-test="15"></span>
          </span>
        </div>
        <div
          kind="platform"
          class="platform-vars"
          style="top: 348px; left: 85px; pointer-events: auto"
        >
          <div event-catcher="" class="octagon">
            <div class="octagon octagon-inner platform-vars"></div>
          </div>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-horizontal bridge-edge-top"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="56"></span>
            <span class="anchor-point" data-test="57"></span>
          </span>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-verticlar bridge-edge-right"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="54"></span>
            <span class="anchor-point" data-test="55"></span>
          </span>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-horizontal bridge-edge-bottom"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="20"></span>
            <span class="anchor-point" data-test="21"></span>
          </span>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-verticlar bridge-edge-left"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="22"></span>
            <span class="anchor-point" data-test="23"></span>
          </span>
        </div>
        <div
          kind="platform"
          class="platform-vars"
          style="top: 348px; left: 350px; pointer-events: auto"
        >
          <div event-catcher="" class="octagon">
            <div class="octagon octagon-inner platform-vars"></div>
          </div>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-horizontal bridge-edge-top"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="52"></span>
            <span class="anchor-point" data-test="53"></span>
          </span>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-verticlar bridge-edge-right"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="26"></span>
            <span class="anchor-point" data-test="27"></span>
          </span>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-horizontal bridge-edge-bottom"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="28"></span>
            <span class="anchor-point" data-test="29"></span>
          </span>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-verticlar bridge-edge-left"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="30"></span>
            <span class="anchor-point" data-test="31"></span>
          </span>
        </div>
        <div
          kind="platform"
          class="platform-vars"
          style="top: 154px; left: 351px; pointer-events: auto"
        >
          <div event-catcher="" class="octagon">
            <div class="octagon octagon-inner platform-vars"></div>
          </div>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-horizontal bridge-edge-top"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="32"></span>
            <span class="anchor-point" data-test="33"></span>
          </span>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-verticlar bridge-edge-right"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="34"></span>
            <span class="anchor-point" data-test="35"></span>
          </span>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-horizontal bridge-edge-bottom"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="36"></span>
            <span class="anchor-point" data-test="37"></span>
          </span>
          <span
            kind="bridge-edge"
            reproduce=""
            class="platform-vars bridge-edge-verticlar bridge-edge-left"
          >
            <div event-catcher=""></div>
            <span class="anchor-point" data-test="48"></span>
            <span class="anchor-point" data-test="49"></span>
          </span>
        </div>
      </main>
    `, 'text/html')

    mapEl = document.children[0] as HTMLElement


    const mockBridgeSerialized = [
      [48,49,2,3],
      [50,51,28,29],
      [52,53,36,37],
      [54,55,30,31],
      [56,57,4,5]
    ]
    const bridges = mockBridgeSerialized.map<Bridge>(listTestIds => {
      const anchorPoints = listTestIds.map(id => mapEl.querySelector<HTMLElement>(`[data-test="${id}"]`)!)
      return new Bridge(anchorPoints, mapEl)
  })

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('map-creator/bridge').__setMockBridges(bridges)
  })

  test("returns correct list of visited points", () => {

    const expectedOutputTestIds = [null, '0', '1', '2', '49', '32', '33', '34', '35', '36', '53', '26', '27', '28', '51', '10', '11', '12', '13', '14', '15', '50', '29', '30', '55', '20', '21', '22', '23', '56', '5', '6', '7', '3', '4', '57', '54', '31', '52', '37', '48', null, null, null, null]
    const expectedOutputPoints = expectedOutputTestIds.map(id => {
      if (id === null) return null
      const el = mapEl.querySelector<HTMLElement>(`[data-test="${id}"]`)!
      return {
        x: 10, // Number.parseInt(el.style.left),
        y: 10, // Number.parseInt(el.style.top),
      }
    })
    expect(serializeMap(mapEl, 1)).toEqual(expectedOutputPoints)
  })
})