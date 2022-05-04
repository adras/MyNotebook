<bp:setup cacheable="true"/>
<bp:include template="header.tpl" shared_values="true" cacheable="yes"/>
<PRE>

<!-- bold and title are read from the config file--><bp:if value="bold" cacheable="yes"><b></bp:if><!-- capitalize the first letters of each word of the title -->Title: <bp:print value="title" format="capitalize" cacheable="yes"/><bp:if value="bold" cacheable="yes"></b></bp:if>

The current date and time is <bp:now format="Y-m-d H:m:s"/>

The value of global assigned variable $SCRIPT_NAME is <bp:server variable="SCRIPT_NAME" cacheable="yes"/>

Example of accessing server environment variable SERVER_NAME: <bp:server variable="SERVER_NAME" cacheable="yes"/>

The value of $Name is <b><bp:value name="Name" cacheable="true"/></b>

variable modifier example of &lt;bp:print value="$name" format="upper"/&gt;

<b><bp:print value="Name" format="upper" cacheable="yes"/></b>


An example of a section loop:

<bp:foreach in="names" as="person" index="_index" cacheable="yes"><bp:set_dot/>	<bp:$_index/> <bp:$bullet/> <bp:$person[0]/> <bp:$person[1]/>
</bp:foreach>
An example of section looped key values:

<bp:foreach in="contacts" as="contact" cacheable="yes">	phone: <bp:$contact[phone]/><br>
	fax: <bp:$contact[fax]/><br>
	cell: <bp:$contact[cell]/><br>
</bp:foreach>
<p>
testing strip tags
<bp:strip cacheable="yes">
<table border=0>
	<tr>
		<td>
			<A HREF="<bp:server variable="SCRIPT_NAME"/>">
			<font color="red">This is a  test     </font>
			</A>
		</td>
	</tr>
</table>
</bp:strip>

</PRE>

This is an example of the html_options function:

<form>
<select name=states>
<bp:html_options values="option_values" selected="option_selected" output="option_output" cacheable="yes"/>
</select>
</form>

<bp:include template="footer.tpl" cacheable="yes"/>