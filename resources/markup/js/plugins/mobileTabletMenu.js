import SlideOut from 'slideout'

export const mobileTabletMenu = () => {
  const lg = 1024
  let screenWidth = window.screen.width;

  if (screenWidth < lg) {
    const slideOut = init(screenWidth)
  }
  resizeEvent(lg)
}


const init = (screenWidth) => {
  const slideOut = new SlideOut({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': screenWidth,
    'tolerance': 70
  })

  document.querySelector('.mobile_tablet_menu_toggle').addEventListener('click', function () {
    slideOut.toggle();
  })

  document.querySelector('#close-mobile_tablet_menu').addEventListener('click', function () {
    slideOut.close();
  })

  return slideOut
}

const resizeEvent = (breakpoint) => {
  window.addEventListener('resize', () => {
    let screenWidth = window.screen.width
    const slideOut = init(screenWidth)

    if (screenWidth >= breakpoint) {
      slideOut.destroy()
    }
  })
}
