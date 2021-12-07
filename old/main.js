// var slider = new Slider({
// 	container: 'slider_container'
// });

// console.log(slider)

document.getElementById('hambg_btn').addEventListener('click', function() {
    document.getElementById('hambg_btn').classList.toggle('is-active');
    document.getElementsByTagName('nav')[0].classList.toggle('open');
})