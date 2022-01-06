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

  // display tooltip
  $('[data-bs-toggle="tooltip"]').tooltip()

  //form validation
  $("#contactForm").validate({
    errorClass: "error-message",
    // validClass: "valid success-alert",
    rules: {
      name : {
        required: true,
        minlength: 2
      },
      age: {
        require: {
          depends: function () {
            return $("#age").val() > 18 && $("#age").val() < 50
          }
        },
        number: true,
      },
      email: {
        required: true,
        email: true
      },
      subject: {
        required: true,
      },
      message: {
        required: true,
        minlength:10
      }
    },
    messages : {
      name: {
        minlength: "Name should be at least 2 characters"
      },
      age: {
        required: "Please enter your age btw 18 and 50",
        number: "Please enter your age as a numerical value",
        // min: "You must be at least 18 years old"
      },
      email: {
        email: "The email should be in the format: abc@domain.tld"
      },
      subject: {
        required: "subject is required."
      },
      message: {
        minlength : "message must be at least 10 characters"
      }
    },
    submitHandler: function (form) {
      form.submit()
    }
  });


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

  //navbar section
  $("nav ul li a").each(function (i, e) {
    console.log(i, e)
    $(this).on("click", () => {
      console.log(i, e)
      //first remove all the active class of nav <a>
      $("nav ul li a").each(function () {
        $(this).removeClass("active")
      })
      //add the active class to the clicked <a>
      $(this).addClass("active")
      $(".animated-section").each(function (index, ele) {
        console.log(index, ele)
        //remove section-active for all <section>
        $(this).removeClass("section-active")
        // if the index of the < a > matches the index of the < section >, means a tag matches the relevant page
        if (i === index) {
          console.log(index)
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
    let nextPageIndex = null
    $("nav ul li a").each(function (i) {
      let className = $(this).attr("class")
      if (className === "active") {
        nextPageIndex = (i + 1) % 6
        $(this).removeClass("active")
      }
    })
    $("nav ul li a").eq(nextPageIndex).addClass("active")
    $(".animated-section").each(function (index) {
      $(this).removeClass("section-active")
      if (nextPageIndex === index) {
        let classNames = $(this).attr("class").split(" ")
        classNames.forEach((className) => {
          if (animations.includes(className)) $(this).removeClass(className)
        })
        let random = getRandomInt(0, animations.length - 1)
        $(this).addClass(`section-active ${animations[random]}`)
        // $(this).addClass("section-active")
      }
    })
  })
  $(".arrow-left").on("click", () => {
    let previousPageIndex = null
    $("nav ul li a").each(function (i) {
      let className = $(this).attr("class")
      if (className === "active") {
        previousPageIndex = i - 1
        previousPageIndex === -1 ? (previousPageIndex = 5) : previousPageIndex
        $(this).removeClass("active")
      }
    })
    $("nav ul li a").eq(previousPageIndex).addClass("active")
    $("section").each(function (index) {
      $(this).removeClass("section-active")
      if (previousPageIndex === index) {
        let classNames = $(this).attr("class").split(" ")
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
})

//Menu toggle
var siteHeader = $(".site-header")
$(window).resize(function () {
  var win = $(this)
  if (win.width() <= 992) {
    siteHeader.addClass("animate__slideOutRight")
    siteHeader.css("display", "none")
    //tooltip placement
    $(".list-group>.list-group-item").attr("data-bs-placement", "top")
  } else {
    siteHeader.removeClass("animate__slideOutRight")
    siteHeader.css("display", "")
    $(".list-group>.list-group-item").attr("data-bs-placement", "left")
  }
}).resize()

if ($(window).width() <= 992) {
  siteHeader.addClass("animate__slideOutRight")
  $(".menu-toggle").on("click", () => {
    siteHeader.css("display","block")
    $(".menu-toggle > i").toggleClass("lnr-menu lnr-cross")
    $(".site-header").toggleClass("animate__slideInRight animate__slideOutRight")
  })
}
