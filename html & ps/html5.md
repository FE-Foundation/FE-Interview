header
footer
nav  
section  强调分段、分块
article  强调独立

<article>
	<h1>内嵌页面</h1>
	<object>
		<embed src="#" width="600" height="400"></embed>
	</object>
</article>

hgroup
address
<time datetime="2015-10-10" pubdate>2015-10-10</time>


<form id="testform">
	<input type="text">
</form>
<textarea form="testform"></textarea>

<form>
	<input type="submit" value="v1" formtarget="_blank" formaction="1.php" formmethod="post">
	<input type="submit" value="v2" formtarget="_self" formaction="2.php" formmethod="get">
</form>

<form>
	<input type="text" formenctype="text/plain" required="required">
	<input type="text" formenctype="multipart/form-data" autofocus>
	<input type="text" formenctype="application/x-www-form-urlencoded">
</form>

<form>
	<input type="text" name="greeting" list="greetings">
	<datalist id="greetings">
		<option value="HTML5"></option>
		<option value="CSS3"></option>
		<option value="JavaScript"></option>
	</datalist>

	<input type="text" pattern="[A-Z]{3}" name="part">
	<input type="submit">
</form>

增加与改良的input元素，类型：
<input type="url" name="url" value="http://www.baidu.com">
<input type="email" name="email" value="originalsoul@yeah.net">
<input type="date" name="date" value="">
<input type="time" name="time" value="10:00">
<input type="datetime" name="datetime" value="">
<br>
<input type="month" name="month" value="2015-06-24">
<input type="week" name="week">
<input type="number" name="number" value="15" min="10" max="100" step="5">
<input type="range" name="range" value="25" min="0" max="100" step="5">
<br>
<input type="search">
<input type="tel">
<input type="color">