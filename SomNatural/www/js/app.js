
document.addEventListener('deviceready', onDeviceReady.bind(this), false);
var range
var app = new Framework7({
	root: '#app',
	name: 'AppPrefab',
	id: 'crom.appprefab',
	panel: {
		swipe: 'left',
	},
	touch: {
		tapHold: true //enable tap hold events
	},
	routes: [{
		path: '/index/',
		url: 'index.html',
		on: {
			pageInit: function (event, page) {
				app.views.main.router.navigate('/home/');
				setTimeout(() => {

				}, 5000);
			}
		}
	},
	{
		path: '/home/',
		url: './pages/home.html',
		/*  */
		on: {
			pageInit: function (event, page) {

				LoadPlayer()




			}
		}
	}
	],
});

var $$ = Dom7;


function onDeviceReady() {
	var mainView = app.views.create('.view-main', {
		url: '/index/'
	});
	document.addEventListener("backbutton", onBackKeyDown, false);
	function onBackKeyDown() {
		var currentRoute = app.views.main.router.currentRoute;

		if (currentRoute.url === '/home/') {
			app.views.main.router.navigate('/index/');
		} else {
			app.views.main.router.back();
		}
	}

}