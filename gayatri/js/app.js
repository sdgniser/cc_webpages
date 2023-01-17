const elem = selector => {
  return document.querySelector(selector)
}

// loading json
$(function(){
  $.getJSON('https://gayatri-p.github.io/coding-club/data/projects.json',function(data){
      console.log('success');
      $.each(data.projects, function(i,project){
        console.log(project.name)
        let figure = `<figure class="carousel-item">
          <img src="${project.image}" class="carousel__image">
          <figcaption class="carousel__caption">
            <h3 class="carousel__title">${project.name}</h3>
            <p class="carousel__subtitle"><a target="_blank" href="${project.website}">WEBSITE</a> | <a target="_blank" href="${project.source}">SOURCE CODE</a></p>
          </figcaption>
        </figure>`

        $('.carousel-items').append(figure);
      });

      let list = Object.values(document.querySelectorAll('.carousel-item'))
      console.log(list)
      let translate, caption, spotlight;
      let length = list.length
      let middleTerm = Math.ceil((length-1) / 2)
      let spotlightIndex = middleTerm
      left.addEventListener('click', _ => {
        spotlightIndex = (spotlightIndex == 0) ? (list.length - 1) : (spotlightIndex - 1);
        spotlight = list[spotlightIndex]
        caption = spotlight.querySelector('figcaption')
        translate = (middleTerm-spotlightIndex)*100;
        Object.keys(list).forEach(function(key) {
          list[key].style.transform = 'translateX(' + translate + '%)';
        })
      })
      right.addEventListener('click',  _ => {
        spotlightIndex = (spotlightIndex == (list.length - 1)) ? 0 : (spotlightIndex + 1);
        spotlight = list[spotlightIndex]
        caption = spotlight.querySelector('figcaption')
        translate = (middleTerm-spotlightIndex)*100;
        Object.keys(list).forEach(function(key) {
          list[key].style.transform = 'translateX(' + translate + '%)';
        })
      })
  }).error(function(){
      console.log('error');
  });
});

function getMemberDetails(member) {
  let figure = `<figure class="member-card">
  <div class="member-image">
    <img src="${member.image}" alt="member profile">
  </div>
  <figcaption>
      <p class="member-name">${member.name}</p>
      <p class="member-desc">${member.desc}</p>
      <p class="member-socials">
        <a href="${member.email}"></a>
        <a href="${member.github}"></a>
      </p>
  </figcaption>
</figure>`
return figure;
};

$(function(){
  $.getJSON('https://gayatri-p.github.io/coding-club/data/members.json',function(data){
      console.log('success');
      $.each(data.current_members, function(i, member){
        let figure = getMemberDetails(member)
        $('.team-current').append(figure);
      });
      $.each(data.older_members, function(i, member){
        let figure = getMemberDetails(member)
        $('.team-alumni').append(figure);
      });
  }).error(function(){
      console.log('error');
  });
});

$(function(){
  $.getJSON('https://gayatri-p.github.io/coding-club/data/blogs.json',function(data){
      console.log('success');
      $.each(data.blogs, function(i, blog){
        let blog_item = `<div class="blog">
          <img class="blog-image" src="${blog.image}" alt="">
          <div class="blog-content">
            <h3 class="blog-title">${blog.title}</h3>
            <p class="blog-abstract">${blog.abstract}</p>
          </div>
          <a href="${blog.link}" class="blog-btn">Read More</a>
        </div>`
        $('.blogs').append(blog_item);
      });
  }).error(function(){
      console.log('error');
  });
});

$(function(){
  $.getJSON('https://gayatri-p.github.io/coding-club/data/news.json',function(data){
      console.log('success');
      $.each(data.news, function(i, news_item){
        let article = `<div class="article">
            <div class="article-date">${news_item.date}</div>
            <div class="article-content">${news_item.content}</div>
            <a href="${news_item.link}" class="article-btn">Know More</a>
          </div>`
        $('.articles').append(article);
      });
  }).error(function(){
      console.log('error');
  });
});

// SMOOTH SCROLLING --------------------
let scrollLink = $('.scroll');
scrollLink.click(function (e) {
  e.preventDefault();
  $('body,html').animate({
    scrollTop: $(this.hash).offset().top - $('nav').height() - 20
  }, 1000);
});

// PARALLAX --------------------
let nav = elem('nav')
let introHeight = elem('.section--intro').offsetHeight
let aboutOffset = $('#about').offset().top - ($(window).height() / 1.2)
let teamOffset = $('#team').offset().top - ($(window).height() / 1.5)
let projectsOffset = elem('#projects').offsetTop - ($(window).height() / 1.6)
let footerOffset = elem('footer').offsetTop //- ($(window).height() / 1)

$(window).scroll(function () {
  let wScroll = $(window).scrollTop()

  // NAVIGATION
  if (wScroll > introHeight) { 
    nav.classList.add('alone') 
    $('#niser-logo').attr("src","images/n_logo_color.png")
  }
  if (wScroll < introHeight) { 
    nav.classList.remove('alone') 
    $('#niser-logo').attr("src","images/n_logo.png")
  }

  // LANDING ELEMENTS
  if (wScroll > projectsOffset) {$('#projects .section__title').addClass('is-showing');}
  if (wScroll > teamOffset) {$('#team .section__title').addClass('is-showing');}

  if (wScroll > aboutOffset*1.2) {elem('#about .section__title').classList.add('is-showing');}
  if (wScroll > aboutOffset) {elem('#about .section__image').classList.add('is-showing');}
  // if (wScroll > footerOffset) {
  //   elem('footer .logo').classList.add('is-showing');
  //   // console.log('shownmf')
  // }
  console.log(wScroll, footerOffset)

})

// CAROUSEL --------------------
const left = document.getElementById('js-left')
const right = document.getElementById('js-right')


window.onload = function () {
  checkNav()

  typingAnimation('CODING CLUB', 100, "typing")
  typingAnimation('NISER', 100, "typing-2")

}

// $(document).ready(function () {

// })


function typingAnimation(txt, speed, container) {
  var i = 0;

  function typeWriter() {
    if (i < txt.length) {
      let char = txt.charAt(i)
      if (char == ' ') {
        char = '<br/>'
      }
      document.getElementById(container).innerHTML += char;
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter()

}


$('.team-switch-current').click(function() {
  $('.team-alumni').fadeOut()
  $('.team-current').fadeIn()
  $('.team-switch-current').addClass('active')
  $('.team-switch-alumni').removeClass('active')
})
$('.team-switch-alumni').click(function() {
  $('.team-current').fadeOut()
  $('.team-alumni').fadeIn()
  $('.team-switch-current').removeClass('active')
  $('.team-switch-alumni').addClass('active')
})

$('#nav-close').click(function() {
  $('.logo-2').fadeOut()
  $('nav ul').fadeOut()
  $('#nav-close').fadeOut()
  $('nav').addClass('small')
  $('nav').removeClass('small-open')
})

$('#nav-open').click(function() {
  $('nav').removeClass('small')
  $('nav').addClass('small-open')
  $('.logo-2').fadeIn()
  $('nav ul').fadeIn()
  $('#nav-close').fadeIn()
  $('#nav-close').attr('style', 'display:block')
})

$('nav ul li').click(function() {
  if ($('nav').hasClass('small-open')) {
    $('.logo-2').fadeOut()
    $('nav ul').fadeOut()
    $('#nav-close').fadeOut()
    $('nav').addClass('small')
    $('nav').removeClass('small-open')
  }
})

$(window).resize(checkNav())

function checkNav() {
  if ($(window).width() > 700) {
    $('nav').removeClass('small') 
  }
  else {
    $('nav').addClass('small') 
  }
}