<%@ Page Title="Home Page" Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WebApplication1._Default" %>

<!DOCTYPE html>
<html>
    <head>
        <title>Test</title>
        <link rel="stylesheet" type="text/css" href="<%= ResolveUrl("~/Content/css/index.css") %>"/>
    </head>
    <body>
        
        <div class="container">
            
            <div class="well well-lg">
                <h2 rv-class-text-success="text">Ett litet exempel</h2>
                <p rv-hide="text">Skriv lite text i textarean!</p>
                <p>{text | reverse}</p>
            </div>
            
            <hr/>

            Skriv lite text:
            <textarea rv-value="text" style="width: 100%" rows="20"></textarea>
        </div>

        <script src="<%= ResolveUrl("~/Content/js/index.out.js") %>"></script>
    </body>
</html>
