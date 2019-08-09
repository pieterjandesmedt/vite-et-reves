document.addEventListener('DOMContentLoaded', () => {

	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {

		// Add a click event on each of them
		$navbarBurgers.forEach(el => {
			el.addEventListener('click', () => {

				// Get the target from the "data-target" attribute
				const target = el.dataset.target;
				const $target = document.getElementById(target);

				// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
				el.classList.toggle('is-active');
				$target.classList.toggle('is-active');

			});
		});
	}

	// Code goes here
	var lastKnownScrollY = 0;
	var currentScrollY = 0;
	var ticking = false;
	var idOfHeader = 'navbar';
	var eleHeader = null;


	const classes = {
		pinned: 'header-pin',
		unpinned: 'header-unpin',
	};


	function onScroll() {
		currentScrollY = window.pageYOffset;
		requestTick();
	}


	function requestTick() {
		if (!ticking) {
			requestAnimationFrame(update);
		}
		ticking = true;
	}

	function update() {
		if (currentScrollY < lastKnownScrollY) {
			pin();
		} else if (currentScrollY > lastKnownScrollY) {
			unpin();
		}
		lastKnownScrollY = currentScrollY;
		ticking = false;
	}


	function pin() {
		if (eleHeader.classList.contains(classes.unpinned)) {
			eleHeader.classList.remove(classes.unpinned);
			eleHeader.classList.add(classes.pinned);
		}
	}


	function unpin() {
		if (eleHeader.classList.contains(classes.pinned) || !eleHeader.classList.contains(classes.unpinned)) {
			eleHeader.classList.remove(classes.pinned);
			eleHeader.classList.add(classes.unpinned);
		}
	}

	window.onload = function () {
		eleHeader = document.getElementById(idOfHeader);
		console.log(eleHeader);
		document.addEventListener('scroll', onScroll, false);
	}

	lozad('.lozad', {
		load: function (el) {
			el.src = el.dataset.src;
			el.onload = function () {
				el.classList.add('fade')
			}
		}
	}).observe()

});

