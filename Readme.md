# WS Social Wall

- - -

### Demo
[Social Wall Standard](http://extranet.wslabs.it/socialwall/ws-social-wall/socialwall.html)

[Social Wall con Load More](http://extranet.wslabs.it/socialwall/ws-social-wall/socialwall-load-more.html)

- - - 

### Getting Started

Includere il file **socialwall/socialwall.js** nell'html, dopo jQuery.
Se necessario includere anche **Masonry** e **imagesLoaded**

```sh
<script src="socialwall/js/masonry.pkgd.min.js"></script>
<script src="socialwall/js/imagesloaded.pkgd.min.js"></script>
<script src="socialwall/js/socialwall.js"></script>
```


Includere il file **socialwall/css/socialwall.css** nell'head.
Il css è generato dal file **socialwall/scss/socialwall.scss**

```sh
<link href="socialwall/css/socialwall.css" rel="stylesheet" />
```

Includere l'html di **social-wall-grid**

```sh
<div class="social-wall-grid" data-code="..." data-token="..." data-max-feed="10" data-masonry="true" data-load-more="true" ></div>
```
- - -
### Settings


<table>
    <tr>
        <th style="white-space: nowrap; text-align: left;">data-code</th>
        <td>Codice Social Wall - API</td>
    </tr>
    <tr>
        <th style="white-space: nowrap; text-align: left;">data-token</th>
        <td>Access Token</td>
    </tr>
    <tr>
        <th style="white-space: nowrap; text-align: left;">data-max-feed</th>
        <td>Numero massimo di feed da visualizzare</td>
    </tr>
    <tr>
        <th style="white-space: nowrap; text-align: left;">data-masonry</th>
        <td>Se *true* la griglia viene predisposta in  [Masonry](http://masonry.desandro.com/) </td>
    </tr>
    <tr>
        <th style="white-space: nowrap; text-align: left;">data-load-more</th>
        <td>Se *true* viene inserito un bottone "Load More"</td>
    </tr>
</table>
