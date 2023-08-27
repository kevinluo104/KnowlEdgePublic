import React, { useEffect } from 'react';
import CommentSection from './CommentSection/CommentSection';
import { useDispatch, useSelector } from 'react-redux';
import NavbarComponent from '../Components/Navbar';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { getCourseContentAsync } from './redux/thunks';
import FileUpload from '../Components/FileUpload';
import { changePageID } from './redux/ResourcePageSlice';
// https://stackoverflow.com/questions/21075692/javascript-split-method-resulting-in-undefined citation for fixing error with Split
const StyleResource = styled.div`
  .courseTitle {
    /* Courses > CPSC 310 */

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 48px;

    color: #373537;

    margin: 20px;
  }
`;

/*
Theme Name: Skirmish
Theme URI: http://blankthemes.com/skirmish/
Author: Blank Themes
Author URI: http://blankthemes.com/
Description: Skirmish is an elegant, responsive, two column WordPress theme. A great starting point for personal blogs.
Version: 1.9
License: GNU General Public License
License URI: license.txt
Tags: white, two-columns, flexible-width, custom-header, custom-background, custom-menu, microformats, post-formats, sticky-post, threaded-comments

Skirmish, Copyright 2012 BlankThemes.com

Skirmish is a derivative of _s ("Underscores") WordPress Theme, Copyright 2012 Automattic, Inc.

This theme, like WordPress, is licensed under the GPL.
*/

const StyleCourse = styled.div`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, font, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td {
	border: 0;
	font-family: inherit;
	font-size: 100%;
	font-style: inherit;
	font-weight: inherit;
	margin: 0;
	outline: 0;
	padding: 0;
	vertical-align: baseline;
}
html {
	font-size: 62.5%; /* Corrects text resizing oddly in IE6/7 when body font-size is set using em units http://clagnut.com/blog/348/#c790 */
	overflow-y: scroll; /* Keeps page centred in all browsers regardless of content height */
	-webkit-text-size-adjust: 100%; /* Prevents iOS text size adjust after orientation change, without disabling user zoom */
	-ms-text-size-adjust: 100%; /* www.456bereastreet.com/archive/201012/controlling_text_size_in_safari_for_ios_without_disabling_user_zoom/ */
}
body {
	font-family: "Droid Sans", helvetica neue, helvetica, arial, georgia;
	color:#777;
	font-size:14px;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
nav,
section {
	display: block;
}
ol, ul {
	list-style: none;
}
table { /* tables still need 'cellspacing="0"' in the markup */
	border-collapse: separate;
	border-spacing: 0;
}
caption, th, td {
	font-weight: normal;
	text-align: left;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: "";
}
blockquote, q, .format-aside {
	quotes: "" "";
	font-family:georgia, arial;
	font-style:italic;
}
a:focus {
	outline: thin dotted;
}
a:hover,
a:active { /* Improves readability when focused and also mouse hovered in all browsers people.opera.com/patrickl/experiments/keyboard/test */
	outline: 0;
}
a img {
	border: 0;
}


/* =Global
----------------------------------------------- */


button,
input,
select,
textarea {
	font-family: sans-serif;
	font-size: 16px;
	line-height: 1.5;
}

/* Headings */
h1, h2, h3 {
	color: #000;
	text-rendering: optimizelegibility;
	font-family:georgia, arial;
	font-weight:normal;
}
h1{font-size:28px; font-family:"Lusitana", georgia, helvetica, arial;}
h2{font-size:26px; font-family:"Lusitana", helvetica, arial;}
h3{font-size:24px; font-family:"georgia", helvetica, arial;}
h4{font-size:22px; font-family:"georgia", helvetica, arial;}
h5{font-size:18px; font-family:"georgia", helvetica, arial;}
h6{font-size:16px; font-family:"georgia", helvetica, arial;}
h1,h2,h3,h4,h5,h6 {
	clear: both;
}
hr {
	background-color: #ccc;
	border: 0;
	height: 1px;
	margin-bottom: 1.5em;
}
/* Text elements */
p {
	margin-bottom: 1.5em;
	line-height:22px;
}
ul, ol {
	margin: 0 0 1.5em 3em;
}
ul {
	list-style: disc;
}
ol {
	list-style: decimal;
}
ul ul, ol ol, ul ol, ol ul {
	margin-bottom: 0;
	margin-left: 1.5em;
}
dt {
	font-weight: bold;
}
dd {
	margin: 0 1.5em 1.5em;
}
b, strong {
	font-weight: bold;
}
dfn, cite, em, i {
	font-style: italic;
}
blockquote {
	margin: 0 1.5em;
}
address {
	margin: 0 0 1.5em;
}
pre {
	background: #eee;
	font-family: "Courier 10 Pitch", Courier, monospace;
	font-size: 15px;
	line-height: 1.6;
	margin-bottom: 1.6em;
	padding: 1.6em;
	overflow: auto;
	max-width: 100%;
}
code, kbd, tt, var {
	font: 15px Monaco, Consolas, "Andale Mono", "DejaVu Sans Mono", monospace;
}
abbr, acronym {
	border-bottom: 1px dotted #666;
	cursor: help;
}
mark, ins {
	background: #fff9c0;
	text-decoration: none;
}
sup,
sub {
	font-size: 75%;
	height: 0;
	line-height: 0;
	position: relative;
	vertical-align: baseline;
}
sup {
	bottom: 1ex;
}
sub {
	top: .5ex;
}
small {
	font-size: 75%;
}
big {
	font-size: 125%;
}
figure {
	margin: 0;
}
table {
	margin: 0 0 1.5em;
	width: 100%;
}
th {
	font-weight: bold;
}

input,
select,
textarea {
	font-size: 100%; /* Corrects font size not being inherited in all browsers */
	margin: 0; /* Addresses margins set differently in IE6/7, F3/4, S5, Chrome */
	vertical-align: baseline; /* Improves appearance and consistency in all browsers */
	*vertical-align: middle; /* Improves appearance and consistency in all browsers */
	background: #f3f3f3;
	border: 1px solid #dcdcdc;
	box-shadow: inset 1px 1px 1px rgba(0,0,0,0.1);
	-moz-box-shadow: inset 1px 1px 1px rgba(0,0,0,0.1);
	-webkit-box-shadow: inset 1px 1px 1px rgba(0,0,0,0.1);
	padding:6px;
}
input:focus,
select:focus,
textarea:focus {
	background:#fff;
	outline: none;
}
button,
input {
	line-height: normal; /* Addresses FF3/4 setting line-height using !important in the UA stylesheet */
	*overflow: visible;  /* Corrects inner spacing displayed oddly in IE6/7 */
}
button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
background: #62392b; /* Old browsers */
background: -moz-linear-gradient(top,  #62392b 0%, #43271d 100%); /* FF3.6+ */
background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#62392b), color-stop(100%,#43271d)); /* Chrome,Safari4+ */
background: -webkit-linear-gradient(top,  #62392b 0%,#43271d 100%); /* Chrome10+,Safari5.1+ */
background: -o-linear-gradient(top,  #62392b 0%,#43271d 100%); /* Opera 11.10+ */
background: -ms-linear-gradient(top,  #62392b 0%,#43271d 100%); /* IE10+ */
background: linear-gradient(top,  #62392b 0%,#43271d 100%); /* W3C */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#62392b', endColorstr='#43271d',GradientType=0 ); /* IE6-9 */

	padding: 8px 16px;
	color:#fff;
	border:none;
	font-size:13px;
	cursor:pointer;
	-moz-border-radius: 3px;
	-khtml-border-radius: 3px;
	-webkit-border-radius: 3px;
	border-radius: 3px;
	font-family:georgia, arial;
}
button:hover,
html input[type="button"]:hover,
input[type="reset"]:hover,
input[type="submit"]:hover {
background: #43271d; /* Old browsers */
background: -moz-linear-gradient(top,  #43271d 0%, #62392b 100%); /* FF3.6+ */
background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#43271d), color-stop(100%,#62392b)); /* Chrome,Safari4+ */
background: -webkit-linear-gradient(top,  #43271d 0%,#62392b 100%); /* Chrome10+,Safari5.1+ */
background: -o-linear-gradient(top,  #43271d 0%,#62392b 100%); /* Opera 11.10+ */
background: -ms-linear-gradient(top,  #43271d 0%,#62392b 100%); /* IE10+ */
background: linear-gradient(top,  #43271d 0%,#62392b 100%); /* W3C */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#43271d', endColorstr='#62392b',GradientType=0 ); /* IE6-9 */
}
button:focus,
html input[type="button"]:focus,
input[type="reset"]:focus,
input[type="submit"]:focus,
button:active,
html input[type="button"]:active,
input[type="reset"]:active,
input[type="submit"]:active {
background: #43271d; /* Old browsers */
background: -moz-linear-gradient(top,  #43271d 0%, #62392b 100%); /* FF3.6+ */
background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#43271d), color-stop(100%,#62392b)); /* Chrome,Safari4+ */
background: -webkit-linear-gradient(top,  #43271d 0%,#62392b 100%); /* Chrome10+,Safari5.1+ */
background: -o-linear-gradient(top,  #43271d 0%,#62392b 100%); /* Opera 11.10+ */
background: -ms-linear-gradient(top,  #43271d 0%,#62392b 100%); /* IE10+ */
background: linear-gradient(top,  #43271d 0%,#62392b 100%); /* W3C */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#43271d', endColorstr='#62392b',GradientType=0 ); /* IE6-9 */

}
input[type="checkbox"],
input[type="radio"] {
	box-sizing: border-box; /* Addresses box sizing set to content-box in IE8/9 */
	padding: 0; /* Addresses excess padding in IE8/9 */
}
input[type="search"] {
	-webkit-appearance: textfield; /* Addresses appearance set to searchfield in S5, Chrome */
	-moz-box-sizing: content-box;
	-webkit-box-sizing: content-box; /* Addresses box sizing set to border-box in S5, Chrome (include -moz to future-proof) */
	box-sizing: content-box;
}
input[type="search"]::-webkit-search-decoration { /* Corrects inner padding displayed oddly in S5, Chrome on OSX */
	-webkit-appearance: none;
}
button::-moz-focus-inner,
input::-moz-focus-inner { /* Corrects inner padding and border displayed oddly in FF3/4 www.sitepen.com/blog/2008/05/14/the-devils-in-the-details-fixing-dojos-toolbar-buttons/ */
	border: 0;
	padding: 0;
}
input[type=text],
textarea {
	color: #666;
	border: 1px solid #ccc;
	border-radius: 3px;
}
input[type=text]:focus,
textarea:focus {
	color: #111;
}
input[type=text] {
	padding: 3px;
}
textarea {
	overflow: auto; /* Removes default vertical scrollbar in IE6/7/8/9 */
	padding-left: 3px;
	vertical-align: top; /* Improves readability and alignment in all browsers */
	width: 98%;
}

/* Links */
a{color:#723710; text-decoration:none;}
a:hover{color:#9A927D;}

.more-link{
	letter-spacing:1px; 
	text-transform:uppercase; 
	color:#333; 
	font-family:georgia; 
	font-size:13px;
	display:block;
	margin-top:12px;
	width:180px;
	}

/* Alignment */
.alignleft {
	display: inline;
	float: left;
	margin:0 15px 0 0;
}
.alignright {
	display: inline;
	float: right;
	margin:0 0 0 15px;
}
.aligncenter {
	clear: both;
	display: block;
	margin: 0 auto;
}
.alignnone{
	clear:both;
	display:block;
}
.entry-content img{margin-top:10px; margin-bottom:10px; border:1px solid #e2e2e2; padding:2px;}

/* Text meant only for screen readers */
.assistive-text {
	clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
	clip: rect(1px, 1px, 1px, 1px);
	position: absolute !important;
}


/* Wrapper */

#page {
	margin: 20px auto;
	max-width: 1000px;
	overflow:hidden;
}

.site-content {
	float: left;
	width: 100%;
}
#content {
	margin: 0 22% 0 0;
}


#main .widget-area {
	float: left;
	overflow: hidden;
	width: 20%;
}
#secondary { /* Sidebar 1 */
	margin: 0 0 0 -20%;
	width:18%;
}

.site-footer {
	clear: both;
	width: 100%;
}

#main{
	padding:20px;
	margin:20px auto 0;
	background: #fff;
	-moz-box-shadow: 0 2px 6px rgba( 100, 100, 100, .3);
	-webkit-box-shadow: 0 2px 6px rgba( 100, 100, 100, .3);
	box-shadow: 0 2px 6px rgba( 100, 100, 100, .3);
	clear:left;
	overflow:hidden;
}

.headerimg{
	width:10%; 
	height:auto;
	display:block;
}



/* =Branding
----------------------------------------------- */

#masthead{
	padding:0;
	background: #fff;
	-moz-box-shadow: 0 2px 6px rgba( 100, 100, 100, .3);
	-webkit-box-shadow: 0 2px 6px rgba( 100, 100, 100, .3);
	box-shadow: 0 2px 6px rgba( 100, 100, 100, .3);
	width:100%;
}

.site-header{
	padding:20px;
}

h1.site-title {
	font-size: 32px;
	font-weight: normal;
	margin: 0;
	padding:0;
	width:100%;
	text-align:center;
}
.site-title a{color:#000;}
.site-title a:hover{color:#723710;}
.site-description {
	font-size: 11px;
	font-weight: normal;
	margin: 0 40px;
	padding:0 0 20px 0;
	font-family:"helvetica neue", helvetica, arial;
	text-transform:uppercase;
	color:#777;
	letter-spacing:1px;
	text-align:center;
}


/* =Menu
----------------------------------------------- */

.main-navigation {
	font-family:"Lusitana", georgia, arial;
	display: block;
	float: left;
	margin: 0 0 20px;
	width: 100%;
	border-top:1px solid #ddd;
	border-bottom:1px solid #ddd;
	font-size:15px;
}
.main-navigation ul {
	list-style: none;
	margin: 0;
	padding:0;
}
.main-navigation li {
	float: left;
	position: relative;
}
.main-navigation a {
	display: block;
	line-height: 2em;
	padding: 0 1em;
	text-decoration: none;
	color:#999;
	border-bottom:4px solid #fff;
}
.main-navigation a:hover {
	border-bottom:4px solid #723710;
}

.main-navigation li:hover > a,
.main-navigation ul ul :hover > a,
.main-navigation a:focus {
	border-bottom:4px solid #723710;
}
.main-navigation ul ul a:hover{
	background:#9A927D;
	border-bottom:4px solid #9A927D;
	color:#fff;
}
.main-navigation ul ul {
	box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-moz-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	-webkit-box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	display: none;
	float: left;
	position: absolute;
	top: 34px;
	left: 0;
	z-index: 99999;
	padding:0 !important;
	text-align:left;
}
.main-navigation ul ul ul {
	left: 100%;
	top: 0;
}
.main-navigation ul ul a {
	background: #723710;
	line-height: 1em;
	padding: 8px 14px;
	width: 10em;
	height: auto;
	border-bottom:4px solid #723710;
	color:#fff;
}


.main-navigation ul ul li {
}
.main-navigation li:hover > a {
}
.main-navigation ul ul :hover > a {
}
.main-navigation ul ul a:hover {
}
.main-navigation ul li:hover > ul {
	display: block;
}
.main-navigation li.current_page_item a,
.main-navigation li.current-menu-item a {
	border-bottom:4px solid #723710;
}

/* Small menu */
.menu-toggle {
	cursor: pointer;
	font-size:15px;
}
.main-small-navigation .menu {
	display: none;
}
.main-small-navigation ul{
	margin:0;
	padding:0;
}
.main-small-navigation ul ul{
	margin:0;
	padding:0;
}
.main-small-navigation ul li{
	list-style-type:none;
	text-align:center;
	margin:0;
	padding:6px 0;
	border-bottom:1px solid #ccc;
}
.main-small-navigation ul ul li{
	list-style-type:none;
	text-align:center;
	margin:0;
	padding:6px 0;
	border-bottom:none;
}



/* =Content
----------------------------------------------- */

.sticky {
	border:1px solid #ddd;
	background:#f8f8f8;
	padding:20px !important;
	margin:0 0 20px 0;
}
.post{padding:0 0 40px 0;}

.entry-title, .page-title{margin:0; text-transform:capitalize;}
.entry-title a, .page-title a{color:#000;}
.entry-title a:hover, .page-title a:hover{color:#723710;}

.page-title{font-size:20px; margin-bottom:20px;}

.entry-meta {
	margin:0 0 12px 0;
	font-size:12px;
	font-family:georgia;
	color:#666;
	font-style:italic;
	clear: both;
}
.hentry {
	margin: 0 0 1.5em;
}
.byline {
	display: none;
}
.single .byline,
.group-blog .byline {
	display: inline;
}
.entry-content,
.entry-summary {
	margin: 1.5em 0 0;
}
.page-links {
	clear: both;
	margin: 0 0 1.5em;
}
.postedon{
	float: left;
	position: relative;
	margin-bottom: 30px;
	width: 125px;
	height:125px;
}
postedon img{
	border:none;
	padding:0 !important;
	border:0 !important;
}

.time{
	position:absolute;
	top:0;
	background:#333;
	text-align:center;
	color:#fff;
	font-size:12px;
	display:block;
	width:100%;
	padding:4px 0;
	font-family:georgia, arial;
}

.entry{
	margin: 0 0 10px 145px;
	padding:0;
	overflow:hidden;
}


/* =Asides
----------------------------------------------- */

.blog .format-aside .entry-title,
.archive .format-aside .entry-title {
	display: none;
}


/* Images */
.entry-content img,
.comment-content img,
.widget img {
	max-width: 10%; /* Fluid images for posts, comments, and widgets */
}
img[class*="align"],
img[class*="wp-image-"],
img[class*="attachment-"] {
	height: auto; /* Make sure images with WordPress-added height and width attributes are scaled correctly */
}
img.size-full,
img.size-large {
	max-width: 10%;
	width: auto; /* Prevent stretching of full-size and large-size images with height and width attributes in IE8 */
	height: auto; /* Make sure images with WordPress-added height and width attributes are scaled correctly */
}
.entry-content img.wp-smiley {
	border: none;
	margin-bottom: 0;
	margin-top: 0;
	padding: 0;
}
img.alignleft,
img.alignright,
img.aligncenter {
	margin-bottom: 1.625em;
}
p img,
.wp-caption {
	margin-top: 0.4em;
}
.wp-caption {
	background: #eee;
	margin-bottom: 1.625em;
	max-width: 96%;
	padding: 9px;
}
.wp-caption img {
	display: block;
	margin: 0 auto;
	max-width: 10%;
}
.wp-caption .wp-caption-text,
.gallery-caption {
	color: #666;
	font-family: Georgia, serif;
	font-size: 12px;
}
.wp-caption .wp-caption-text {
	margin-bottom: 0.6em;
	padding: 10px 0 5px 40px;
	position: relative;
}
.wp-caption .wp-caption-text:before {
	color: #666;
	content: '\2014';
	font-size: 14px;
	font-style: normal;
	font-weight: bold;
	margin-right: 5px;
	position: absolute;
	left: 10px;
	top: 7px;
}
#content .gallery {
	margin: 0 auto 1.625em;
}
#content .gallery a img {
	border: none;
}
img#wpstats {
	display: block;
	margin: 0 auto 1.625em;
}
#content .gallery-columns-4 .gallery-item {
	width: 23%;
	padding-right: 2%;
}
#content .gallery-columns-4 .gallery-item img {
	width: 10%;
	height: auto;
}

/* Image borders */
img[class*="align"],
img[class*="wp-image-"],
#content .gallery .gallery-icon img {/* Add fancy borders to all WordPress-added images but not things like badges and icons and the like */
	border: 1px solid #ddd;
	padding: 6px;
}
.wp-caption img {
	border-color: #eee;
}
a:focus img[class*="align"],
a:hover img[class*="align"],
a:active img[class*="align"],
a:focus img[class*="wp-image-"],
a:hover img[class*="wp-image-"],
a:active img[class*="wp-image-"],
#content .gallery .gallery-icon a:focus img,
#content .gallery .gallery-icon a:hover img,
#content .gallery .gallery-icon a:active img {/* Add some useful style to those fancy borders for linked images ... */
	background: #eee;
	border-color: #bbb;
}
.wp-caption a:focus img,
.wp-caption a:active img,
.wp-caption a:hover img {/* ... including captioned images! */
	background: #fff;
	border-color: #ddd;
}

/* Make sure embeds and iframes fit their containers */
embed,
iframe,
object {
	max-width: 100%;
}

/* =Navigation
----------------------------------------------- */

#content .site-navigation {
	margin: 0 0 1.5em;
	overflow: hidden;
	font-family:helvetica, arial;
}
#content .nav-previous {
	float: left;
	width: 50%;
}
#content .nav-next {
	float: right;
	text-align: right;
	width: 50%;
}

/* =Comments
----------------------------------------------- */

#comments {
	word-wrap: break-word;
}
.comments-title{
	border-bottom: 1px solid #ccc;
	font-family: "georgia", Helvetica Neue, Arial, Helvetica, "Nimbus Sans L", sans-serif;
	font-size: 14px;
	letter-spacing: 0.025em;
	margin: 0 0 20px 0;
	padding: 2px 0 20px 0;
	text-transform:uppercase;
}
#reply-title {
	font-family: "georgia", Helvetica Neue, Arial, Helvetica, "Nimbus Sans L", sans-serif;
	font-size: 14px;
	text-transform:uppercase;
}
#comments ol {
	list-style: none;
	margin-left: 0;
}
#comments ul {
	list-style: none;
	margin-left: 0.425em;
}
#comments li {
	position: relative;
	margin:0 0 20px 0;
	padding:0 0 20px 0;
	border-bottom:1px solid #ccc;
}
#comments li.pingback {
	background: #eee;
	margin: 0 0 1.7em;
	padding: 0.85em;
}
#comments li.pingback + li.pingback {
	margin-top: -1.65em;
}
#comments li.pingback p {
	font: 12px "Helvetica Neue", Arial, Helvetica, "Nimbus Sans L", sans-serif;
	margin: 0;
}
#comments ul li {
	border-left: 1px solid #ccc;
	border-bottom: none;
	margin: 20px 0 20px 30px;
	padding:0 0 0 30px;
}
#comments .comment-author {
	margin: 0 66px 0.85em 0;
}
#comments .comment-author cite {
	font-style: normal;
}
#comments .comment-meta,
#comments .comment-meta a {
	color: #888;
	font: 12px "Helvetica Neue", Arial, Helvetica, "Nimbus Sans L", sans-serif;
}
#comments .comment-meta a:hover {
	color: #df0000;
}
#comments .avatar {
	padding: 3px;
	position: absolute;
	top: 0;
	right: 0;
    background: #fcfcfc;
    border: 1px solid #c8c8c2;
    -moz-box-shadow: 0 0 3px rgba(0,0,0,0.1);
    -webkit-box-shadow: 0 0 3px rgba(0,0,0,0.1);
    box-shadow: 0 0 3px rgba(0,0,0,0.1);
}
#comments .comment-body {
	margin-right: 66px;
}
#respond{
	overflow:hidden;
	display:block;
	margin-bottom:10px;
}
#respond .form-allowed-tags{
	margin:20px 0;
}
#respond input[type=text] {
	float: left;
	margin: 0 10px 0 0;
}
#respond input[type=submit] {
	float: right;
}
#respond .comment-form-comment {
	margin: 0;
}
#respond .comment-form-comment label {
	display: none;
}
#respond .form-allowed-tags {
	color: #888;
	font-size: 12px;
}
#respond .form-allowed-tags code {
	font-size: 11px;
}
.bypostauthor {
}



/* =Widgets
----------------------------------------------- */

.widget {
	display: block;
	font-size:13px;
	margin:0 0 30px 0;
}
.widget ul{margin:8px 0 16px; padding:0;}
.widget ul li{list-style-type:none; line-height:22px;}

.widget-title{
	font-size:12px; 
	text-transform:uppercase; 
	font-family:"Lusitana", georgia, helvetica, arial; 
	font-weight:normal; 
	color:#333; 
	margin:0 0 8px 0;
	padding:10px 0;
	border-top:1px solid #ddd;
	border-bottom:1px solid #ddd;
	letter-spacing:1px;
}
.widget-area .widget_search {
	overflow: hidden;
	margin:0 0 20px;
}
#searchform{
	padding:0;
	margin:16px 0 20px 0;
	}

#searchform input#s{
	padding: 6px 8px;
	margin: 0;
	border:none;
	background:#eee;
	color:#605140;
	width: 90%;
	text-transform:lowercase;
	-moz-border-radius: 5px;
	-khtml-border-radius: 5px;
	-webkit-border-radius:5px;
	border-radius: 5px;
	}
	
#searchform input#s:hover{
	background:#e6e6e6;
	}
	
#searchform input#s:focus{
	background:#eee;
	}
	
	
	


/* =Responsive Structure
----------------------------------------------- */

@media (max-width: 800px) {/* begin @media */
	#page{padding-bottom:20px;}
	#primary{
		float:none;
		clear:left;
		width:100%;
	}
	#content {
		margin: 0;
		padding:0;
		width:100%;
		float:none;
	}
	#main{padding:20px !important;}
	#secondary {
		float: none;
		margin: 0;
		padding:0;
		width:100% !important;
		background:#333;
		clear:left;
		
	}
	.widget{
		float: left;
		margin-right:14px;
		color:#fff;
		padding:20px;
	}	
	.widget .widget-title{
		color:#fff;
	}
	.widget a{
		color:#ccc;
	}
	.widget a:hover{
		color:#fff;
	}
	.postedon{display:none;}
	.entry{
	margin: 0 0 10px 0px;
	overflow:hidden;
}

}/* end @media */

/* end Responsive Structure */




#colophon {
	text-align:center;
	font-size:12px;
	margin:20px auto;
	max-width:1000px;
	padding:20px 0;
	background: #fff;
	-moz-box-shadow: 0 2px 6px rgba( 100, 100, 100, .3);
	-webkit-box-shadow: 0 2px 6px rgba( 100, 100, 100, .3);
	box-shadow: 0 2px 6px rgba( 100, 100, 100, .3);
	clear:left;
}`;

const ResourcePage = () => {
  const uid = useSelector((state) => state.user.currentUser.uid);

  const { courseTitle, resourceName } = useParams();

  const course = courseTitle.toUpperCase();

  const courseNameParts = course.split('-');

  const finalCourseName = `${courseNameParts[0]} ${courseNameParts[1]}`;

  const courseContent = useSelector(
    (state) => state.resourcePageReducer.courseContent
  );

  const { '*': dynamicSegmentValue } = useParams();
  console.log('This', dynamicSegmentValue);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changePageID(courseTitle + '-' + resourceName));
    if (uid && resourceName && courseTitle) {
      dispatch(
        getCourseContentAsync({
          uid: uid,
          courseIdentifier: resourceName + '-' + courseTitle,
        })
      );
    }

    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [uid, resourceName, courseTitle, location.pathname]);

  const courseContentName =
    String(courseContent.courseName).split('-')[0].toUpperCase() +
    ' ' +
    String(courseContent.courseName).split('-')[1];

  return (
    <StyleResource>
      <NavbarComponent></NavbarComponent>
      <h1 className="courseTitle">
        {' '}
        {'Course > ' + finalCourseName + ' > ' + resourceName}
      </h1>
      <FileUpload></FileUpload>
      {/* <StyleCourse>
        <div
          dangerouslySetInnerHTML={{ __html: courseContent.courseInformation }}
        />
      </StyleCourse> */}
      <br></br>
      <CommentSection />
    </StyleResource>
  );
};

export default ResourcePage;
