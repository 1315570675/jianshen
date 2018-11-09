function getPc(data)
{
	if (data >= 0 && data < 50)
	{
		return '#cfcfcf';
	}
	if (data >= 50 && data < 60)
	{
		return '#03dec0';
	}
	if (data >= 60 && data < 70)
	{
		return '#97e962';
	}
	if (data >= 70 && data < 80)
	{
		return '#feb303';
	}
	if (data >= 80 && data < 90)
	{
		return '#ff7501';
	}
	if (data >= 90 && data <= 100)
	{
		return '#fe4832';
	}
}

function getWeek()
{
	var $day = new Date().getDay();
	var week = '';
	switch ($day)
	{
		case 0:
			week = 'SUNDAY';
			break;
		case 1:
			week = 'MONDAY';
			break;
		case 2:
			week = 'TUESDAY';
			break;
		case 3:
			week = 'WEDNESDAY';
			break;
		case 4:
			week = 'THURSDAY';
			break;
		case 5:
			week = 'FRIDAY';
			break;
		case 6:
			week = 'SATURDAY';
			break;
	}
	return week;
}

function getHours()
{
	var date = new Date();
	var h = addTrim(date.getHours());
	var m = addTrim(date.getMinutes());
	var s = addTrim(date.getSeconds());
	return h + ':' + m + ':' + s;
}

function getTime()
{
	var date = new Date();
	var y = addTrim(date.getFullYear());
	var m = addTrim(date.getMonth() + 1);
	var d = addTrim(date.getDate());
	return y + '-' + m + '-' + d;
}

function addTrim(num)
{
	if (num < 10)
	{
		return '0' + num;
	}
	else
	{
		return '' + num;
	}
}

function sortEff(x, y)
{
	return y.effort - x.effort;
}

function setCo2(pro)
{
	var path = document.getElementById('co2');
	var r = 74;
	var progress = pro / 100;
	//将path平移到我们需要的坐标位置
	co2.setAttribute('transform', 'translate(' + 78 + ',' + 78 + ')');

	// 计算当前的进度对应的角度值
	var degrees = progress * 360;
	$('#co2-dot').css({"transform": "rotate(" + degrees + "deg)"});

	// 计算当前角度对应的弧度值
	var rad = degrees * (Math.PI / 180);
	//极坐标转换成直角坐标
	var x = (Math.sin(rad) * r).toFixed(2);
	var y = -(Math.cos(rad) * r).toFixed(2);

	//大于180度时候画大角度弧，小于180度的画小角度弧，(deg > 180) ? 1 : 0
	var lenghty = window.Number(degrees > 180);

	//path 属性
	var descriptions = ['M', 0, -r, 'A', r, r, 0, lenghty, 1, x, y];

	// 给path 设置属性
	path.setAttribute('d', descriptions.join(' '));
}

function getPerImg(num)
{
	
}

function setTime(h, m, s,ms,$class)
{
	$('#hour').find('span').eq(0).removeClass().addClass($class + addTrim(h).substr(0, 1));
	$('#hour').find('span').eq(1).removeClass().addClass($class + addTrim(h).substr(1, 1));
	$('#minute').find('span').eq(0).removeClass().addClass($class + addTrim(m).substr(0, 1));
	$('#minute').find('span').eq(1).removeClass().addClass($class + addTrim(m).substr(1, 1));
	$('#second').find('span').eq(0).removeClass().addClass($class + addTrim(s).charAt(0));
	$('#second').find('span').eq(1).removeClass().addClass($class + addTrim(s).charAt(1));
	$('#ms').find('span').eq(0).removeClass().addClass($class + addTrim(ms).charAt(0));
	$('#ms').find('span').eq(1).removeClass().addClass($class + addTrim(ms).charAt(1));
}



function addTrim(num)
{
	if (num < 10)
	{
		return '0' + num;
	}
	else
	{
		return '' + num;
	}
}

function setCount($ele,$count,$class){
	isFlag($ele + ' .count-num')
	if($count < 10){
		$($ele+' .no2-num').removeClass().addClass('no2-num ' + $class + $count);
	}else{
		$($ele + ' .count-num').removeClass('one-num')
		$($ele + ' .no1-num').removeClass().addClass('no1-num ' + $class+ $count.toString().substr(0,1));
		$($ele + ' .no2-num').removeClass().addClass('no2-num '+ $class+ $count.toString().substr(1,1));
	}
}

function setLatCount($ele,$count,$class){
	if($count < 10){
		$($ele+' .no2-num').removeClass().addClass('no2-num ' + $class + $count);
	}else{
		$($ele + ' .no1-num').removeClass().addClass('no1-num ' + $class+ $count.toString().substr(0,1));
		$($ele + ' .no2-num').removeClass().addClass('no2-num '+ $class+ $count.toString().substr(1,1));
	}
	isFlag($ele+' .count-bg');
	isFlag($ele + ' .count-num');
}

function getPosition($ele, $left, $top)
{
	var top = $($ele).offset().top;
	var left = $($ele).offset().left;
	var $w = $($ele).width()
	var $h = $($ele).height();

	return $left >= left && $left <= left+$w && $top >= top && $top <= top + $h ? true : false;
}

function isFlag(ele)
{
	$(ele).css('webkitAnimationPlayState', 'running');
	$(ele).on('webkitAnimationIteration', function ()
	{
		$(this).css('webkitAnimationPlayState', 'paused');
	})
}

function setInfoTime(id,$class,m,s,ms){
	$(id+' .minute').find('span').eq(0).removeClass().addClass($class + addTrim(m).substr(0, 1));
	$(id+' .minute').find('span').eq(1).removeClass().addClass($class + addTrim(m).substr(1, 1));
	$(id+' .second').find('span').eq(0).removeClass().addClass($class + addTrim(s).charAt(0));
	$(id+' .second').find('span').eq(1).removeClass().addClass($class + addTrim(s).charAt(1));
	$(id+' .ms').find('span').eq(0).removeClass().addClass($class + addTrim(ms).charAt(0));
	$(id+' .ms').find('span').eq(1).removeClass().addClass($class + addTrim(ms).charAt(1));
}


/*时间对象*/
/*
function dates(stamp,$class){
	this.stamp = stamp;
	this.timer = null;
	this.class = $class;
}
dates.prototype.setArgs = function(){
	this.h =  parseInt(this.stamp / (60 * 60 * 1000));
	this.m = parseInt((this.stamp - this.h * 60 * 60 * 1000) / (60 * 1000));
	this.s = parseInt((this.stamp - this.h * 60 * 60 * 1000 - this.m * 60 * 1000) / 1000);
	this.ms = parseInt((this.stamp - this.h * 60 * 60 * 1000 - this.m * 60 * 1000 - this.s * 1000) / 100);
}
dates.prototype.clear = function(){
	clearInterval(this.timer)
	this.h = 0;
	this.m = 0;
	this.s = 0;
	this.ms = 0;
	this.setTimes()
}
dates.prototype.setTimes = function(){
	$('#hour').find('span').eq(0).removeClass().addClass(this.class + addTrim(this.h).substr(0, 1));
	$('#hour').find('span').eq(1).removeClass().addClass(this.class + addTrim(this.h).substr(1, 1));
	$('#minute').find('span').eq(0).removeClass().addClass(this.class + addTrim(this.m).substr(0, 1));
	$('#minute').find('span').eq(1).removeClass().addClass(this.class + addTrim(this.m).substr(1, 1));
	$('#second').find('span').eq(0).removeClass().addClass(this.class + addTrim(this.s).charAt(0));
	$('#second').find('span').eq(1).removeClass().addClass(this.class + addTrim(this.s).charAt(1));
	$('#ms').find('span').eq(0).removeClass().addClass(this.class + addTrim(this.ms).charAt(0));
	$('#ms').find('span').eq(1).removeClass().addClass(this.class + addTrim(this.ms).charAt(1));
}
dates.prototype.runTime = function(){
	this.timer = setInterval(()=>{
		++this.s == 60 ? (this.m++, this.s = 0) : null;
		this.m == 60 ? (this.h++, this.m = 0) : null;
		this.setTimes();
	},10)
}
dates.prototype.paused = function(){
	clearInterval(this.timer);
}*/
