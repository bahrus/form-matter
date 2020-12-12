# form-matter

```html
<form-matter if-wants-to-be=formatted></form-matter>
...
<form method=GET action="//mydomain.com/api/company/{company}" be-formatted>
    <input name=company>
    <input type=search name=surname>
    <button type=submit></button>
</form>

```

```html
<form-matter if-wants-to-be=formatted req-init='{"mode": "cors"}'></form-matter>
...
<form method=GET action={#myPreconnectLinkId}/api/company/{company} be-formatted>
    <input name=company>
    <input type=search name=surname>
    <button type=submit></button>
</form>
```

When submitted, makes fetch call (or uses iframe) to //mydomain.com/api/company/{company}?surname=...

Fires events with response.

## HTML Response



## Target visible iframe

```html
<form-matter if-wants-to-be=formatted req-init='{"mode": "cors"}'></form-matter>
...
<form method=GET action={#myPreconnectLinkId}/api/company/{company} be-formatted target=myIframe>
    <input name=company>
    <input type=search name=surname>
    <button type=submit></button>
</form>

<iframe name=myIframe class=hideIfNoSrc></iframe>
```



## Stream to DOM Element via hidden iframe

## JSON response

Fire event and/or set prop of host container