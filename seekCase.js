/*
 * by: lucklyRookie
 * 
 */
var SeleBox = function (wrapper ,data) {
	
	var me = this,
	seleContent = '<input type="text" class="enter" /><div></div>',//init data content
	wrap = document.querySelector('#' + wrapper),//get wrapper
	seekArr = [],//seek Array
	seekValue = '',//seek value
	dataLeft = '',//data left value
	dataRight = '';//data right value
	
	//initial wrap data
	wrap.innerHTML = seleContent;
	
	//seek data
	me.seek = seek;
	function seek () {
		wrap.firstChild.addEventListener('keyup', function () {
			//enter add data
			if (event.keyCode === 13) {
				if (data.indexOf(this.value) === -1) {
					data.push(this.value);
					wrap.firstChild.focus();
					wrap.firstChild.select();
				}
			}
			seekProcess();
			hideData();
		}, false);
	};
	
	//seek process
	me.seekProcess = seekProcess;
	function seekProcess () {
		seleContent = '';
		seekArr = [];
		seekValue = wrap.firstChild.value;
		for (ele in data) {
			if (wrap.firstChild.value !== '' && data[ele].indexOf(seekValue) !== -1) {
				seekArr.push(data[ele]);
			}
		}
		wrap.firstChild.nextSibling.innerHTML = showData(seekArr);
	}
	
	//show data
	me.showData = showData;
	function showData (dataArr) {
		seleContent = '';
		for (sel in dataArr) {
			dataLeft = dataArr[sel].slice(0, dataArr[sel].indexOf(seekValue));
			dataRight = dataArr[sel].slice(dataLeft.length + seekValue.length);
			seleContent += dataArr[sel] !== undefined ? '<div class="noHide"><label class="noHide">' + dataLeft + '</label><label class="red noHide">' + seekValue + '</label><label class="noHide">' + dataRight + '</label><label class="close noHide">x</label></div>' : '';
		}
		del(dataArr);
		return seleContent;
	};
	
	//hide data
	me.hideData = hideData;
	function hideData () {
		document.addEventListener('click', function (e) {
			var ev = e || window.event;
			var target = ev.target || ev.srcElement;
			console.log(target.className);
			if (target.className !== 'enter' && target.className !== 'noHide' && target.className !== 'red noHide' && target.className !== 'close noHide') {
				wrap.lastChild.innerHTML = '';
			}
		}, false);
	};
	
	//delete data
	me.del = del;
	function del (delArr) {
		wrap.addEventListener('click', function (e) {
			var ev = e || window.event;
			var target = ev.target || ev.srcElement;
			if (target.className.indexOf('close') !== -1) {
				var delData = target.parentElement.firstChild.innerHTML + target.previousSibling.previousSibling.innerHTML + target.previousSibling.innerHTML;
				for (ele in delArr) {
					if (delArr[ele] === delData) {
						delArr.splice(ele, 1);
					}
				}
				for (ele in data) {
					if (data[ele] === delData) {
						data.splice(ele, 1);
					}
				}
				target.parentElement.style.display = 'none';
			}
			else if (target.className === 'noHide') {
				wrap.firstChild.value = target.firstChild.innerHTML + target.firstChild.nextSibling.innerHTML + target.lastChild.previousSibling.innerHTML;
				wrap.firstChild.focus();
				wrap.firstChild.select();
			} else if (target.className === 'enter') {
				seekProcess();
				wrap.firstChild.focus();
				wrap.firstChild.select();
			}
		}, false);
	};
	
	me.seek();
	
};
