$(document).ready(() => {
  // Background Animation
  // $(document).mousemove((e) => {
  //   let x = e.clientX
  //   let y = e.clientY
  //   $(".lm-animated-bg").css("background-position", "calc( 50% + " + x * -0.008 + "px ) calc( 50% + " + y * -0.008 + "px )")
  // })
  // Homepage Animation
  const toggleAnimationClass = () => {
    $(".subtitle1").toggleClass("animate__animated")
    setTimeout(() => {
      // checks each element for the specified class names. The class names are added if missing, and removed if already set - This creates a toggle effect.
      $(".subtitle1").toggleClass("display-none")
      $(".subtitle2").toggleClass("animate__animated display-none")
    }, 4000)
    setTimeout(toggleAnimationClass, 4000)
  }
  toggleAnimationClass()

  // Bootstrap Navbar tooltips js code
  // [].slice.call(arguments)能将具有length属性的对象转成数组。
  // var tooltipTriggerList = [].slice.call($('[data-bs-toggle="tooltip"]'))
  // var tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
  //   return new bootstrap.Tooltip(tooltipTriggerEl)
  // })

  // display tooltip
  $('[data-bs-toggle="tooltip"]').tooltip()
})

//Section switch by navbar
const animations = [
  "animate__backInDown",
  "animate__bounceInUp",
  "animate__bounceInLeft",
  "animate__flipInX",
  "animate__rotateIn",
  "animate__rotateInDownLeft",
  "animate__rollIn",
  "animate__zoomIn",
  "animate__slideInLeft",
]
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
$("nav ul li a").each(function (i) {
  $(this).on("click", () => {
    //first remove all the active class of nav <a>
    $("nav ul li a").each(function () {
      $(this).removeClass("active")
    })
    //add the active class to the clicked <a>
    $(this).addClass("active")
    $("section").each(function (index) {
      //remove section-active for all <section>
      $(this).removeClass("section-active")
      // if the index of the < a > matches the index of the < section >, means a tag matches the relevant page
      if (i === index) {
        // get the class attribute of <section> and split into an array of strings of classNames
        let classNames = $(this).attr("class").split(" ")
        classNames.forEach((className) => {
          if (animations.includes(className)) $(this).removeClass(className)
        })
        let random = getRandomInt(0, animations.length - 1)
        $(this).addClass(`section-active ${animations[random]}`)
      }
    })
  })
})
//section switch by arrows
$(".arrow-right").on("click", () => {
  let currentIndex = null
  $("nav ul li a").each(function (i) {
    let className = $(this).attr("class")
    if (className === "active") {
      currentIndex = (i + 1) % 6
      $(this).removeClass("active")
    }
  })
  $("nav ul li a").eq(currentIndex).addClass("active")
  $("section").each(function (index) {
    $(this).removeClass("section-active")
    if (currentIndex === index) {
      let classNames = $(this).attr("class").split(/\s+/)
      classNames.forEach((className) => {
        if (animations.includes(className)) $(this).removeClass(className)
      })
      let random = getRandomInt(0, animations.length - 1)
      $(this).addClass(`section-active ${animations[random]}`)
    }
  })
})
$(".arrow-left").on("click", () => {
  let currentIndex = null
  $("nav ul li a").each(function (i) {
    let className = $(this).attr("class")
    if (className === "active") {
      currentIndex = i - 1
      currentIndex === -1 ? (currentIndex = 5) : currentIndex
      $(this).removeClass("active")
    }
  })
  $("nav ul li a").eq(currentIndex).addClass("active")
  $("section").each(function (index) {
    $(this).removeClass("section-active")
    if (currentIndex === index) {
      let classNames = $(this).attr("class").split(/\s+/)
      classNames.forEach((className) => {
        if (animations.includes(className)) $(this).removeClass(className)
      })
      let random = getRandomInt(0, animations.length - 1)
      $(this).addClass(`section-active ${animations[random]}`)
    }
  })
})
//Carousel about-me-testimonials
$(".about-me-testimonials .owl-carousel").owlCarousel({
  loop: false,
  nav: true,
  margin: 10,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
  },
})

//carousel about-me-clients
$(".about-me-clients .owl-carousel").owlCarousel({
  loop: true,
  nav: true,
  margin: 10,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 5,
    },
  },
})

//Menu toggle
$(window)
  .resize(function () {
    if ($(window).width() <= 992) {
      $(".site-header").addClass("animate__slideOutRight")
    } else {
      $(".site-header").removeClass("animate__slideOutRight")
    }
  })
  .resize()
if ($(window).width() <= 992) {
  $(".menu-toggle").on("click", () => {
    $(".menu-toggle > i").toggleClass("lnr-menu lnr-cross")
    $(".site-header").toggleClass("animate__slideInRight animate__slideOutRight")
  })
}
