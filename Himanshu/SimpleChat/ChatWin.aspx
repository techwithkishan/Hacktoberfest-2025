<%@ Page language="c#" Codebehind="ChatWin.aspx.cs" AutoEventWireup="false" Inherits="SuperJockey.ChatWin" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>ChatWin</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="assets/formstyle.css" type="text/css" rel="stylesheet">
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="Form1" method="post" runat="server">
			<TABLE id="Table6" cellSpacing="0" cellPadding="0" width="456" align="center" border="0">
				<TR>
					<TD width="8" height="8"><IMG height="8" src="orange1.gif" width="8"></TD>
					<TD bgColor="orange" height="22" rowSpan="2" width="224" vAlign="bottom"><STRONG>Chatroom</STRONG></TD>
					<TD vAlign="bottom" align="right" width="224" bgColor="orange" height="22" rowSpan="2"></TD>
					<TD width="8" height="8"><IMG height="8" src="orange2.gif" width="8"></TD>
				</TR>
				<TR>
					<TD bgColor="orange" height="14"><IMG height="14" src="assets/imgs/spacer.gif" width="1"></TD>
					<TD bgColor="orange" height="14"><IMG height="14" src="assets/imgs/spacer.gif" width="1"></TD>
				</TR>
			</TABLE>
			<TABLE id="Table3" cellSpacing="0" cellPadding="1" border="0" align="center" bgColor="orange">
				<TR>
					<TD>
						<iframe style="BORDER-RIGHT: orange 2px solid; BORDER-TOP: orange 2px solid; BORDER-LEFT: orange 2px solid; WIDTH: 450px; BORDER-BOTTOM: orange 2px solid; HEIGHT: 250px; BACKGROUND-COLOR: #ffffcc"
							src="TheChatScreenWin.aspx">Chat</iframe>
					</TD>
				</TR>
				<TR>
					<TD align="right">
						Message:
						<asp:TextBox id="TB_ToSend" runat="server" Width="300px" tabIndex="1"></asp:TextBox>
						<asp:Button id="BT_Send" runat="server" Text="Send" Width="80px" CssClass="button1" tabIndex="2"></asp:Button>
					</TD>
				</TR>
			</TABLE>
		</form>
	</body>
</HTML>
