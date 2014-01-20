var promoManager = {
	setItems: function(value) {
		this._items = value;
	},
	setCookiePrefix: function(value) {
		this._cookiePrefix = value;
	},
	_hasCookies:[],

	cookieStringForItemAtIndex: function(index) {
		return this._cookiePrefix+index;
	},
	cookieStringForLastSeenItem: function() {
		return this._cookiePrefix+"last";
	},

	_firstUnseenItemIndex: -1,
	_currentItemIndex: -1,
	_lastSeenItemIndex: -1,
	setCurrentItemIndex: function(value) {
		this._currentItemIndex = value;
		var date = new Date();
		date.setDate(date.getDate() + 42);
		document.cookie = (this.cookieStringForItemAtIndex(this._currentItemIndex)+'=true; expires=' + date.toGMTString() + '; path=/; domain='+window.location.hostname);
		document.cookie = (this.cookieStringForLastSeenItem()+'='+value+'; expires=' + date.toGMTString() + '; path=/; domain='+window.location.hostname);
		if(this._unseenItems.length === 1) {
			//Erase the cookies
			for(var j=0, countJ = this._items.length;j<countJ;j++) {
				document.cookie = (this.cookieStringForItemAtIndex(j)+'=;path=/; domain='+window.location.hostname);
			}
		}
	},

	_hasSeenItem: false,
	currentItemIndex: function() {
		if(this._currentItemIndex === -1) {
			this.readCookiesIfNeeded();
		}
		return this._currentItemIndex;
	},
	currentItem: function() {
		return this._items[this.currentItemIndex()];
	},
	_didReadCookies: false,
	readCookiesIfNeeded: function() {
		if(!this._didReadCookies) {
			var cookies = document.cookie.split(';'), lastSeenValue = 0, currentIndex, lastSeenCookie = this.cookieStringForLastSeenItem();
			this._unseenItems = [];
			this._lastSeenItemIndex = -1;
			for(var j=0, countJ = this._items.length;j<countJ;j++) {
				var jRegex = new RegExp(this.cookieStringForItemAtIndex(j));

				for(var i = 0; i < cookies.length; i++) {
					var iCookie = cookies[i], iLastSeenValue, iCookieValue = iCookie.split("=")[1];

					if (iCookie.match(lastSeenCookie)) {
						this._lastSeenItemIndex = parseInt(iCookieValue);
					}
					else if (iCookie.match(jRegex) && iCookieValue && iCookieValue.length > 0) {

						this._hasCookies[j] = true;
						this._hasSeenItem = true;
						break;
					}
				}

				if(!this._hasCookies[j]) {
					if(this._firstUnseenItemIndex === -1) {
						this._firstUnseenItemIndex = j;
					}
					this._unseenItems[this._unseenItems.length] = j;
					this._hasCookies[j] = false;
				}
			}
			if(this._unseenItems.length>0) {
				do {
					currentIndex = this._unseenItems[Math.floor(Math.random()*(this._unseenItems.length))];
				} while (currentIndex === this._lastSeenItemIndex)
			}
			else {
				do {
					currentIndex = Math.floor(Math.random()*this._items.length);
				} while (currentIndex === this._lastSeenItemIndex)
			}

			this.setCurrentItemIndex(currentIndex);
			this._didReadCookies = true;
		}
	}
};
