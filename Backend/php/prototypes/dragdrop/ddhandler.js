var DDHandler = Class.create({
	initialize: function () {
		this.dragElement = "";
		this.startPosX = 0;
		this.startPosY = 0;
		this.startIndex;
		document.onmousemove = this.onMouseMove;
	},

	onMouseMove : function ( e) {
		if (this == document)
			return;
		if (this.dragElement != "")
		{
			this.dragElement.setStyle({ 
				position: 'absolute',
				top: e.clientX,
				left: e.clientY
			});
		}
	},
	
	onMouseDown : function ( e) {
		this.dragElement = e;
		for (var i = 0; i < e.parentNode.children.length; i++)
		{
			if (e.parentNode.children[i] == e){
				this.startIndex = i;
				break;
			}
		}
	},

	onMouseUp : function ( e) {
		if (this.dragElement && this.dragElement != "") {
			this.dragElement.setStyle({
					position: '',
					top: '',
					left: ''
				});
			this.dragElement = "";
		}
	}
	
});