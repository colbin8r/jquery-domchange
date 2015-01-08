# jquery-domchange

jquery-domchange is a simple jQuery plugin to add support for DOM change events using jQuery's built-in event system.

```
$("#observable").domchange().on("domchange", function(event, changes) {
    // do something with the changes
});
```

### Usage

Just call the `domchange()` event on an element or elements to begin watching for changes to the DOM:

`$("#observable").domchange()`

After that, you can simply listen for the `domchange` event as you would with any other event:

```
$("observable").on("domchange", function() {
    // something happened to the DOM!    
}
```

The event handler is passed (along with the usual `event` details) a list of DOM changes, called [`MutationRecord`s](https://dom.spec.whatwg.org/#mutationrecord). Each `MutationRecord` contains details about the specific change to the DOM, including the type of change, the affected element, etc.

### Quick Option Reference

- **events**
    + **attributes** (*true*): listen to attribute change events
    + **children** (*true*): listen to childList change events
    + **characterData** (*true*): listen to characterData change events
- **descendents** (*true*): watch for changes to the element's children as well as the element
- **recordPriorValues**
    + **attributes** (*false*): record the old value when the element's attribute is changed; if present, attribute events will always be recorded
    + **characterData** (*false*): record the old value when the element's character data is changed; if present, characterData events will always be recorded
- **attributeFilter** (*null*): listen only to attributes whitelisted here; set to a list (array) of attribute names; if present, attribute events will always be recorded

### Options

#### Change Types

There are several different types of changes that jquery-domchange can listen for:

- attribute
- children
- character data

By default, the plugin will listen for all three. However, if you only need to watch for specific changes, you can turn off the ones you don't need by disabling them when configuration the plugin:

```
$("observable").domchange({
    events: {
        attributes: true,
        children: false,
        characterData: true
    }
});
```

If you're listening to attribute changes, you can filter which attribute's you care about by whitelisting them:

```
$("observable").domchange({
    attributeFilter: true
});
```

(Note: if you set an `attributeFilter`, the browser will assume you want to listen to attribute events regardless of what you set in `events`.)

#### Listening to descendents

You can also choose whether or not you want to listen to changes to the element's children as well. The plugin assumes that you do by default; however, you can disable that to save performance:

```
$("observable").domchange({
    descendents: false
});
```

#### Recording prior values

When an element's attributes or character data changes, you can specically request the old value by telling the plugin to remember it:

```
$("observable").domchange({
    recordPriorValues: {
        attributes: true,
        characterData: true
    }
});
```

You can then access the old value in your listener:

```
$("observable").on("domchange", function(event, changes) {
    console.log(changes[0].oldValue);
});
```
