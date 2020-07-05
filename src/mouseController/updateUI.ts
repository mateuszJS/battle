import REPRESENTATION_IDS from '~/render/representationsIds'

const abilitiesIconsNodes = document.querySelectorAll('#abilities-list li img')
const unitAvatarNode = document.querySelector(
  '#unit-avatar',
) as HTMLImageElement

const MAP_UNIT_TO_AVATAR = {
  [REPRESENTATION_IDS.SOLIDER]: 'assets/soliderRegularAvatar.png',
}

let imgSrc = ''

const updateUI = (representationId?: number) => {
  const newImgSrc = MAP_UNIT_TO_AVATAR[representationId] || ''
  if (imgSrc !== newImgSrc) {
    imgSrc = newImgSrc
    unitAvatarNode.src = imgSrc
  }
}

export default updateUI
