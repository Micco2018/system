var url;
//点击打开管理
$('.js_manage-lists').on('click', 'li', function() {
	var index = $(this).index();
	if(index == ($('.js_manage-lists li').length - 1)) {
		//这里是退出登录
		console.log(index);
		return;
	}
	$('.js_bcg').css('display', 'block');
	$('.js_tableBox li').css('display', 'none');
	$('.js_tableBox li').eq(index).css('display', 'block');
});

//关闭弹窗
$('.js_close').click(function() {
	$(this).parents('li').css('display', 'none');
	$('.js_bcg').css('display', 'none');
});
$('.js_bcg').click(function() {
	$(this).siblings('.js_tableBox').find('li').css('display', 'none');
	$('.js_bcg').css('display', 'none');
});
//监听表格宽度，改变表格宽度时，显示横向滚动条
$('.js_table').resize(function() {
	if($(this).width() >= 1000) {
		$(this).css('overflow-x', 'scroll');
	} else {
		$(this).css('overflow-x', 'hidden');
	}
});

//点击生成修改模态框
$('.js_change1').click(function() {
	var _this = $(this);
	var $div = $('<div class="changeBox js_changeBox">' +
		'<div class="bcgForChange js_bcgForChange"></div>' +
		'<div class="change js_change clearfix">' +
		'<div class="titleForChange">' +
		'<span class="fl">修改</span>' +
		'<span class="fa fa-times js_closeForChange fr"></span>' +
		'</div><div class="txt1 js_txt1 clearfix"></div>' +
		'<button class="concal js_concal" type="button">取消</button>' +
		'<button class="save js_save" type="button">保存</button>' +
		'</div>' +
		'</div>');
	$(this).parents('li').append($div);
	$('.js_bcgForChange').css('display', 'block');
	var oTh = $(this).parents('tbody').siblings('thead').find('th');
	$.each(oTh, function(index, value) {
		if(index == oTh.length - 1) {
			return;
		}
		var $text1 = $('<div class="changeTxt js_changeTxt fl">' +
			'<label for="">' + $(this).text() + ':</label>' +
			'</div>');
		_this.parents('li').find('.js_txt1').append($text1);
		if($(this).text().indexOf('说明') != -1) {
			var $text = $('<textarea name="" rows="5" cols="65"></textarea>');
		} else if($(this).attr('data-img') == 'img') {
			var $img = $('<div class="chooseImg">选择图片</div>' +
				'<input class="fileImg js_fileImg" type="file" name="" id="" value="" />' +
				'<div class="img-box1">' +
				'<img class="js_chooseImg" src="" />' +
				'</div>');
		} else if($(this).text().indexOf('院系名称') != -1) {
			var $position = $('<select name="xueyuan">' +
				'<option value="数据科学与软件工程学院">数据科学与软件工程学院</option>' +
				'<option value="医学院">医学院</option>' +
				'<option value="计算机学院">计算机学院</option>' +
				'<option value="物理院">物理院</option>' +
				'<option value="数学院">数学院</option>' +
				'</select>');
		} else {
			var $text = $('<input type="text" />');

		}
		if($text) {
			$text.val(_this.parent('td').siblings('td').eq(index).text());
			_this.parents('li').find('.changeTxt:last-child').append($text);
		} else if($img) {
			_this.parents('li').find('.changeTxt:last-child').append($img);
			var imgSrc = _this.parent('td').siblings('td').eq(index).find('img').attr('src');
			$('.js_chooseImg').attr('src', imgSrc);
		} else if($position) {
			_this.parents('li').find('.changeTxt:last-child').append($position);
			var ptxt = _this.parent('td').siblings('td').eq(index).text();
			_this.parents('li').find('.changeTxt:last-child').find('select option').each(function(index, value) {
				if($(this).val().indexOf(ptxt) != -1) {
					$(this).attr('selected', 'selected');
					return;
				}
			})
		}
	});

	//关闭模态框
	$('.js_bcg').off('click');
	$('.js_concal').click(function() {
		$('.js_changeBox').remove();
		$('.js_bcg').click(function() {
			$(this).siblings('.js_tableBox').find('li').css('display', 'none');
			$('.js_bcg').css('display', 'none');
		});
	});
	$('.js_closeForChange').click(function() {
		$('.js_changeBox').remove();
		$('.js_bcg').click(function() {
			$(this).siblings('.js_tableBox').find('li').css('display', 'none');
			$('.js_bcg').css('display', 'none');
		});
	});
	//保存修改
	$('.js_save').click(function() {
		$.each($('.changeTxt'), function(index, value) {
			let changeTd = _this.parent('td').siblings('td').eq(index);
			if(changeTd.find('img').length != 0) {
				changeTd.find('img').attr('src', url);
			} else {
				changeTd.text($(this).children().eq(1).val());
			}
		});
		$('.js_changeBox').remove();
		$('.js_bcg').click(function() {
			$(this).siblings('.js_tableBox').find('li').css('display', 'none');
			$('.js_bcg').css('display', 'none');
		});
	});
	$('.js_fileImg').change(function() {
		var input1 = document.querySelector('.js_fileImg');
		url = window.URL.createObjectURL(input1.files[0]);
		$('.js_chooseImg').attr('src', url);
	});
});

$('.js_tableBox li input').on('input', function() {
	let val = $(this).val();
	$(this).parent('.serch').siblings('table').find('tbody tr').each(function(index, value) {
		if($(this).find('td').eq(0).text().indexOf(val) == -1) {
			$(this).css('display', 'none');
		} else {
			$(this).css('display', 'table-row');
		}
	})
});
$('.grade table tbody tr td').css('color', '#333333');
$('.grade table tbody tr').each(function(index, value) {
	var gr = parseInt($(this).find('td').eq(5).text());
	if(gr > 75 && gr <= 100) {
		$(this).css('background', 'chartreuse');
	} else if(gr >= 65 && gr <= 75) {
		$(this).css('background', 'darkorange');
	} else {
		$(this).css('background', 'red');
	}
});

$('.js_tableBox li .js_grade1 input').off('input');

$('.js_grade1 button').click(function() {
	let val = $(this).siblings('input').val();
	var person = parseInt($(this).siblings('span').find('.a:checked').val());
	$(this).parent('.serch').siblings('table').find('tbody tr').each(function(index, value) {
		if($(this).find('td').eq(person).text().indexOf(val) == -1) {
			$(this).css('display', 'none');
		} else {
			$(this).css('display', 'table-row');
		}
	})
});

//添加
$('.js_add').click(function() {
	$(this).parents('li').find('.js_form').css('display', 'block');
	//<div class="chooseImg">选择图片</div>' +
	//				'<input class="fileImg js_fileImg" type="file" name="" id="" value="" />' +
	//				'<div class="img-box1">' +
	//				'<img class="js_chooseImg" src="" />' +
	//				'</div>');

	$('.js_bcg').off('click');
	$('.js_bcgForChange').css('display', 'block');
});

$('.js_concal').click(function() {
	$(this).parents('.js_form').css('display', 'none');
	$('.js_bcgForChange').css('display', 'none');
	$('.js_bcg').click(function() {
		$(this).siblings('.js_tableBox').find('li').css('display', 'none');
		$('.js_bcg').css('display', 'none');
	});
});
$('.js_closeForChange').click(function() {
	$(this).parents('.js_form').css('display', 'none');
	$('.js_bcgForChange').css('display', 'none');
	$('.js_bcg').click(function() {
		$(this).siblings('.js_tableBox').find('li').css('display', 'none');
		$('.js_bcg').css('display', 'none');
	});
});