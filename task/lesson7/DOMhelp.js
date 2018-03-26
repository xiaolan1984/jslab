/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-02-25 14:18:52
 * @version $Id$
 */

DOMhelp={
	// 获取一个节点的最后一个兄弟节点
	lastSibling:function(node){
		// 先获取到节点父元素的最后一个子节点
		var tempObj=node.parentNode.lastChild;
		// 如果最后这个子节点不是元素节点并且最后这个节点还有一个previousSibling，那么previousSibling就为需要查找的最后一个兄弟节点
		while(tempObj.nodeType!=1 && tempObj.previousSibling!=null){
			tempObj=tempObj.previousSibling;
		}
		return (tempObj.nodeType==1)?tempObj:false;
	},
	// 获取一个节点的第一个兄弟节点
	firstSibling:function(node){
		var tempObj=node.parentNode.firstSibling;
		while(tempObj.nodeType!=1 && tempObj.nextSibling!=null){
			tempObj=tempObj.nextSibling;
		}
		return (tempObj.nodeType==1)?tempObj:false;
	},
	// 获取一个元素节点里面的文字
	getText:function(node){
		// 判断节点里面是否有子节点
		if(!node.hasChildNodes()){
			return false;
		}
		var reg=/^\s+$/;
		var tempObj=node.firstChild;
		while(tempObj.nodeType!=3 && tempObj.nextSibling!=null || reg.test(tempObj.nodeValue)){
			tempObj=tempObj.nextSibling;
		}
		return tempObj.nodeType==3?tempObj.nodeValue:false;
	},
	// 设置一个元素节点的文字
	setText:function(node,txt){
		if(!node.hasChildNodes()){
			return false;
		}
		var reg=/^\s+$/;
		var tempObj=node.firstChild;
		while(tempObj.nodeType!=3 && tempObj.nextSibling!=null || reg.test(tempObj.nodeValue)){
			tempObj=tempObj.nextSibling;
		}
		if(tempObj.nodeType==3){
			tempObj.nodeValue=txt
		} else {
			return false;
		}
	},
	// 获取一个元素节点前、后的元素节点
	closestSibling:function(node,direction){
		var tempObj;
		if(direction==-1 && node.previousSibling!=null){
			tempObj=node.previousSibling;
			while(tempObj.nodeType!=1 && tempObj.previousSibling!=null){
				tempObj=tempObj.previousSibling;
			}
		} else if(direction==1 && node.nextSibling!=null){
			tempObj=node.nextSibling;
			while(tempObj.nodeType!=1 && tempObj.nextSibling!=null){
				tempObj=tempObj.nextSibling;
			}
		}
		return tempObj.nodeType==1?tempObj:false;
	},
	// 创建a标签节点
	createLink:function(to,txt){
		var tempObj=document.createElement('a');
		tempObj.appendChild(document.createTextNode(txt));
		tempObj.setAttribute('href',to);
		return tempObj;
	},
	// 创建一个包含文字的元素节点
	createTextElm:function(elm,txt){
		var tempObj=document.createElement(elm);
		tempObj.appendChild(document.createTextNode(txt));
		return tempObj;
	},
	// 操作节点的class类名
	cssjs:function(a,node,c1,c2){
		switch (a){
			case 'swap':
				if (!DOMhelp.cssjs('check',node,c1)) {
					node.className=node.className.replace(c2,c1)
				} else {
					node.className=node.className.replace(c1,c2)
				}
			break;
			case 'add':
				if (!DOMhelp.cssjs('check',node,c1)) {
					node.className+=node.className?' '+c1:c1;
				}
			break;
			case 'remove':
				var rep=node.className.match(' '+c1)?' '+c1:c1;
				node.className=node.className.replace(rep,'');
			break;
			case 'check':
				var found=false;
				var temparray=node.className.split(' ');
				for (var i=0;i<temparray.length;i++) {
					if (temparray[i]==c1) {
						found=true;
					}
				}
				return found;
			break;
		}
	},
	// 事件处理
	addEvent:function(elm,evType,fn,useCapture){
		if (elm.addEventListener) {
			elm.addEventListener(evType,fn,useCapture);
			return true;
		} else if(elm.attachEvent){
			var r=elm.attachEvent('on'+evType,fn);
			return r;
		} else {
			elm['on'+evType]=fn;
		}
	},
	// 同时阻止事件冒泡、取消默认动作
	cancelClick:function(e){
		if (window.event && window.event.cancelBubble && window.event.returnValue) {
			window.event.cancelBubble=true;
			window.event.returnValue=false;
			return;
		} 
		if (e && e.stopProgagetion && e.preventDefault) {
			e.stopProgagetion();
			e.preventDefault();
		}
	},
	// 获取触发事件的目标元素
	getTarget:function(e){
		var target = window.event ? window.event.srcElement : e ? e.target : null;
		if (!target){return false;}
		while(target.nodeType!=1 && target.nodeName.toLowerCase()!='body'){
			target=target.parentNode;
		}
		return target;
	},
	// 阻止冒泡
	stopBubble:function(e){
		if (window.event&&window.event.cancelBubble) {
			window.event.cancelBubble=true;
		}
		if (e && e.stopPropagation) {
			e.stopPropagation();
		}
	},
	// 阻止默认动作
	stopDefault:function(e){
		if (window.event&&window.event.returnValue) {
			window.event.cancelBubble=true;

		}
		if (e&&e.preventDefault) {
			e.preventDefault();
		}
	}

}

