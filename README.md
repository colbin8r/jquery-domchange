# jquery-domchange

jquery-domchange is a simple jQuery plugin to add support for DOM change events using jQuery's built-in event system.

```js
$("#observable").domchange().on("domchange", function(event, changes) {
    // do something with the changes
});
```

#### Quick Usage
1. Call `domchange()` on an element.
2. Attach an event listener for the `domchange` event on that element.
3. Wait a change to that element's DOM to have your listener fired!

### Usage

Just call the `domchange()` event on an element or elements to begin watching for changes to the DOM:

```js
$("#observable").domchange();
```

After that, you can simply listen for the `domchange` event as you would with any other event:

```js
$("#observable").on("domchange", function() {
    // something happened to the DOM!    
}
```

The event handler is passed (along with the usual `event` details) a list of DOM changes, each of which is a [`MutationRecord`](https://dom.spec.whatwg.org/#mutationrecord). Each `MutationRecord` contains details about the specific change to the DOM, including the type of change, the affected element, etc.

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

By default, the plugin will listen for all three. However, if you only need to watch for specific types of changes, you can turn off the ones you don't need by disabling them when configuring the plugin:

```js
$("#observable").domchange({
    events: {
        attributes: true,
        children: false,
        characterData: true
    }
});
```

If you're listening to attribute changes, you can filter which attributes you care about by whitelisting them:

```js
$("#observable").domchange({
    attributeFilter: true
});
```

(Note: if you set an `attributeFilter`, the browser will assume you want to listen to attribute events regardless of what other options you set, even in `events`.)

#### Listening to descendents

You can also choose whether or not you want to listen to changes to the element's children as well. The plugin enables that functionality by default; however, you can disable it to save performance:

```js
$("#observable").domchange({
    descendents: false
});
```

#### Recording prior values

When an element's attributes or character data changes, you can specically request the old value by configuring the plugin to remember it:

```js
$("#observable").domchange({
    recordPriorValues: {
        attributes: true,
        characterData: true
    }
});
```

You can then access the old value in your listener:

```js
$("#observable").on("domchange", function(event, changes) {
    console.log(changes[0].oldValue);
});
```


### About
jquery-domchange was written in 2015 by Colby Rogness and is licensed under the GNU GPL 2. The initial code was generated using [jQuery Boilerplate](http://jqueryboilerplate.com/), which is licensed under the [MIT License](http://zenorocha.mit-license.org/). [This question](http://stackoverflow.com/questions/2844565/is-there-a-jquery-dom-change-listener/11546242#11546242) on StackOverflow proved very helpful in understanding the concepts that this plugin uses.
