
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_slots(slots) {
        const result = {};
        for (const key in slots) {
            result[key] = true;
        }
        return result;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { stylesheet } = info;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                info.rules = {};
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.48.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /**
     * @typedef {Object} WrappedComponent Object returned by the `wrap` method
     * @property {SvelteComponent} component - Component to load (this is always asynchronous)
     * @property {RoutePrecondition[]} [conditions] - Route pre-conditions to validate
     * @property {Object} [props] - Optional dictionary of static props
     * @property {Object} [userData] - Optional user data dictionary
     * @property {bool} _sveltesparouter - Internal flag; always set to true
     */

    /**
     * @callback AsyncSvelteComponent
     * @returns {Promise<SvelteComponent>} Returns a Promise that resolves with a Svelte component
     */

    /**
     * @callback RoutePrecondition
     * @param {RouteDetail} detail - Route detail object
     * @returns {boolean|Promise<boolean>} If the callback returns a false-y value, it's interpreted as the precondition failed, so it aborts loading the component (and won't process other pre-condition callbacks)
     */

    /**
     * @typedef {Object} WrapOptions Options object for the call to `wrap`
     * @property {SvelteComponent} [component] - Svelte component to load (this is incompatible with `asyncComponent`)
     * @property {AsyncSvelteComponent} [asyncComponent] - Function that returns a Promise that fulfills with a Svelte component (e.g. `{asyncComponent: () => import('Foo.svelte')}`)
     * @property {SvelteComponent} [loadingComponent] - Svelte component to be displayed while the async route is loading (as a placeholder); when unset or false-y, no component is shown while component
     * @property {object} [loadingParams] - Optional dictionary passed to the `loadingComponent` component as params (for an exported prop called `params`)
     * @property {object} [userData] - Optional object that will be passed to events such as `routeLoading`, `routeLoaded`, `conditionsFailed`
     * @property {object} [props] - Optional key-value dictionary of static props that will be passed to the component. The props are expanded with {...props}, so the key in the dictionary becomes the name of the prop.
     * @property {RoutePrecondition[]|RoutePrecondition} [conditions] - Route pre-conditions to add, which will be executed in order
     */

    /**
     * Wraps a component to enable multiple capabilities:
     * 1. Using dynamically-imported component, with (e.g. `{asyncComponent: () => import('Foo.svelte')}`), which also allows bundlers to do code-splitting.
     * 2. Adding route pre-conditions (e.g. `{conditions: [...]}`)
     * 3. Adding static props that are passed to the component
     * 4. Adding custom userData, which is passed to route events (e.g. route loaded events) or to route pre-conditions (e.g. `{userData: {foo: 'bar}}`)
     * 
     * @param {WrapOptions} args - Arguments object
     * @returns {WrappedComponent} Wrapped component
     */
    function wrap$1(args) {
        if (!args) {
            throw Error('Parameter args is required')
        }

        // We need to have one and only one of component and asyncComponent
        // This does a "XNOR"
        if (!args.component == !args.asyncComponent) {
            throw Error('One and only one of component and asyncComponent is required')
        }

        // If the component is not async, wrap it into a function returning a Promise
        if (args.component) {
            args.asyncComponent = () => Promise.resolve(args.component);
        }

        // Parameter asyncComponent and each item of conditions must be functions
        if (typeof args.asyncComponent != 'function') {
            throw Error('Parameter asyncComponent must be a function')
        }
        if (args.conditions) {
            // Ensure it's an array
            if (!Array.isArray(args.conditions)) {
                args.conditions = [args.conditions];
            }
            for (let i = 0; i < args.conditions.length; i++) {
                if (!args.conditions[i] || typeof args.conditions[i] != 'function') {
                    throw Error('Invalid parameter conditions[' + i + ']')
                }
            }
        }

        // Check if we have a placeholder component
        if (args.loadingComponent) {
            args.asyncComponent.loading = args.loadingComponent;
            args.asyncComponent.loadingParams = args.loadingParams || undefined;
        }

        // Returns an object that contains all the functions to execute too
        // The _sveltesparouter flag is to confirm the object was created by this router
        const obj = {
            component: args.asyncComponent,
            userData: args.userData,
            conditions: (args.conditions && args.conditions.length) ? args.conditions : undefined,
            props: (args.props && Object.keys(args.props).length) ? args.props : {},
            _sveltesparouter: true
        };

        return obj
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    function parse(str, loose) {
    	if (str instanceof RegExp) return { keys:false, pattern:str };
    	var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
    	arr[0] || arr.shift();

    	while (tmp = arr.shift()) {
    		c = tmp[0];
    		if (c === '*') {
    			keys.push('wild');
    			pattern += '/(.*)';
    		} else if (c === ':') {
    			o = tmp.indexOf('?', 1);
    			ext = tmp.indexOf('.', 1);
    			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
    			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
    			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
    		} else {
    			pattern += '/' + tmp;
    		}
    	}

    	return {
    		keys: keys,
    		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
    	};
    }

    /* node_modules\svelte-spa-router\Router.svelte generated by Svelte v3.48.0 */

    const { Error: Error_1, Object: Object_1, console: console_1 } = globals;

    // (251:0) {:else}
    function create_else_block$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*props*/ 4)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*props*/ ctx[2])])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(251:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (244:0) {#if componentParams}
    function create_if_block$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [{ params: /*componentParams*/ ctx[1] }, /*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*componentParams, props*/ 6)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*componentParams*/ 2 && { params: /*componentParams*/ ctx[1] },
    					dirty & /*props*/ 4 && get_spread_object(/*props*/ ctx[2])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(244:0) {#if componentParams}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*componentParams*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function wrap(component, userData, ...conditions) {
    	// Use the new wrap method and show a deprecation warning
    	// eslint-disable-next-line no-console
    	console.warn('Method `wrap` from `svelte-spa-router` is deprecated and will be removed in a future version. Please use `svelte-spa-router/wrap` instead. See http://bit.ly/svelte-spa-router-upgrading');

    	return wrap$1({ component, userData, conditions });
    }

    /**
     * @typedef {Object} Location
     * @property {string} location - Location (page/view), for example `/book`
     * @property {string} [querystring] - Querystring from the hash, as a string not parsed
     */
    /**
     * Returns the current location from the hash.
     *
     * @returns {Location} Location object
     * @private
     */
    function getLocation() {
    	const hashPosition = window.location.href.indexOf('#/');

    	let location = hashPosition > -1
    	? window.location.href.substr(hashPosition + 1)
    	: '/';

    	// Check if there's a querystring
    	const qsPosition = location.indexOf('?');

    	let querystring = '';

    	if (qsPosition > -1) {
    		querystring = location.substr(qsPosition + 1);
    		location = location.substr(0, qsPosition);
    	}

    	return { location, querystring };
    }

    const loc = readable(null, // eslint-disable-next-line prefer-arrow-callback
    function start(set) {
    	set(getLocation());

    	const update = () => {
    		set(getLocation());
    	};

    	window.addEventListener('hashchange', update, false);

    	return function stop() {
    		window.removeEventListener('hashchange', update, false);
    	};
    });

    const location = derived(loc, $loc => $loc.location);
    const querystring = derived(loc, $loc => $loc.querystring);
    const params = writable(undefined);

    async function push(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	// Note: this will include scroll state in history even when restoreScrollState is false
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined,
    		undefined
    	);

    	window.location.hash = (location.charAt(0) == '#' ? '' : '#') + location;
    }

    async function pop() {
    	// Execute this code when the current call stack is complete
    	await tick();

    	window.history.back();
    }

    async function replace(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	const dest = (location.charAt(0) == '#' ? '' : '#') + location;

    	try {
    		const newState = { ...history.state };
    		delete newState['__svelte_spa_router_scrollX'];
    		delete newState['__svelte_spa_router_scrollY'];
    		window.history.replaceState(newState, undefined, dest);
    	} catch(e) {
    		// eslint-disable-next-line no-console
    		console.warn('Caught exception while replacing the current page. If you\'re running this in the Svelte REPL, please note that the `replace` method might not work in this environment.');
    	}

    	// The method above doesn't trigger the hashchange event, so let's do that manually
    	window.dispatchEvent(new Event('hashchange'));
    }

    function link(node, opts) {
    	opts = linkOpts(opts);

    	// Only apply to <a> tags
    	if (!node || !node.tagName || node.tagName.toLowerCase() != 'a') {
    		throw Error('Action "link" can only be used with <a> tags');
    	}

    	updateLink(node, opts);

    	return {
    		update(updated) {
    			updated = linkOpts(updated);
    			updateLink(node, updated);
    		}
    	};
    }

    // Internal function used by the link function
    function updateLink(node, opts) {
    	let href = opts.href || node.getAttribute('href');

    	// Destination must start with '/' or '#/'
    	if (href && href.charAt(0) == '/') {
    		// Add # to the href attribute
    		href = '#' + href;
    	} else if (!href || href.length < 2 || href.slice(0, 2) != '#/') {
    		throw Error('Invalid value for "href" attribute: ' + href);
    	}

    	node.setAttribute('href', href);

    	node.addEventListener('click', event => {
    		// Prevent default anchor onclick behaviour
    		event.preventDefault();

    		if (!opts.disabled) {
    			scrollstateHistoryHandler(event.currentTarget.getAttribute('href'));
    		}
    	});
    }

    // Internal function that ensures the argument of the link action is always an object
    function linkOpts(val) {
    	if (val && typeof val == 'string') {
    		return { href: val };
    	} else {
    		return val || {};
    	}
    }

    /**
     * The handler attached to an anchor tag responsible for updating the
     * current history state with the current scroll state
     *
     * @param {string} href - Destination
     */
    function scrollstateHistoryHandler(href) {
    	// Setting the url (3rd arg) to href will break clicking for reasons, so don't try to do that
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined,
    		undefined
    	);

    	// This will force an update as desired, but this time our scroll state will be attached
    	window.location.hash = href;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, []);
    	let { routes = {} } = $$props;
    	let { prefix = '' } = $$props;
    	let { restoreScrollState = false } = $$props;

    	/**
     * Container for a route: path, component
     */
    	class RouteItem {
    		/**
     * Initializes the object and creates a regular expression from the path, using regexparam.
     *
     * @param {string} path - Path to the route (must start with '/' or '*')
     * @param {SvelteComponent|WrappedComponent} component - Svelte component for the route, optionally wrapped
     */
    		constructor(path, component) {
    			if (!component || typeof component != 'function' && (typeof component != 'object' || component._sveltesparouter !== true)) {
    				throw Error('Invalid component object');
    			}

    			// Path must be a regular or expression, or a string starting with '/' or '*'
    			if (!path || typeof path == 'string' && (path.length < 1 || path.charAt(0) != '/' && path.charAt(0) != '*') || typeof path == 'object' && !(path instanceof RegExp)) {
    				throw Error('Invalid value for "path" argument - strings must start with / or *');
    			}

    			const { pattern, keys } = parse(path);
    			this.path = path;

    			// Check if the component is wrapped and we have conditions
    			if (typeof component == 'object' && component._sveltesparouter === true) {
    				this.component = component.component;
    				this.conditions = component.conditions || [];
    				this.userData = component.userData;
    				this.props = component.props || {};
    			} else {
    				// Convert the component to a function that returns a Promise, to normalize it
    				this.component = () => Promise.resolve(component);

    				this.conditions = [];
    				this.props = {};
    			}

    			this._pattern = pattern;
    			this._keys = keys;
    		}

    		/**
     * Checks if `path` matches the current route.
     * If there's a match, will return the list of parameters from the URL (if any).
     * In case of no match, the method will return `null`.
     *
     * @param {string} path - Path to test
     * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
     */
    		match(path) {
    			// If there's a prefix, check if it matches the start of the path.
    			// If not, bail early, else remove it before we run the matching.
    			if (prefix) {
    				if (typeof prefix == 'string') {
    					if (path.startsWith(prefix)) {
    						path = path.substr(prefix.length) || '/';
    					} else {
    						return null;
    					}
    				} else if (prefix instanceof RegExp) {
    					const match = path.match(prefix);

    					if (match && match[0]) {
    						path = path.substr(match[0].length) || '/';
    					} else {
    						return null;
    					}
    				}
    			}

    			// Check if the pattern matches
    			const matches = this._pattern.exec(path);

    			if (matches === null) {
    				return null;
    			}

    			// If the input was a regular expression, this._keys would be false, so return matches as is
    			if (this._keys === false) {
    				return matches;
    			}

    			const out = {};
    			let i = 0;

    			while (i < this._keys.length) {
    				// In the match parameters, URL-decode all values
    				try {
    					out[this._keys[i]] = decodeURIComponent(matches[i + 1] || '') || null;
    				} catch(e) {
    					out[this._keys[i]] = null;
    				}

    				i++;
    			}

    			return out;
    		}

    		/**
     * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoading`, `routeLoaded` and `conditionsFailed` events
     * @typedef {Object} RouteDetail
     * @property {string|RegExp} route - Route matched as defined in the route definition (could be a string or a reguar expression object)
     * @property {string} location - Location path
     * @property {string} querystring - Querystring from the hash
     * @property {object} [userData] - Custom data passed by the user
     * @property {SvelteComponent} [component] - Svelte component (only in `routeLoaded` events)
     * @property {string} [name] - Name of the Svelte component (only in `routeLoaded` events)
     */
    		/**
     * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
     * 
     * @param {RouteDetail} detail - Route detail
     * @returns {boolean} Returns true if all the conditions succeeded
     */
    		async checkConditions(detail) {
    			for (let i = 0; i < this.conditions.length; i++) {
    				if (!await this.conditions[i](detail)) {
    					return false;
    				}
    			}

    			return true;
    		}
    	}

    	// Set up all routes
    	const routesList = [];

    	if (routes instanceof Map) {
    		// If it's a map, iterate on it right away
    		routes.forEach((route, path) => {
    			routesList.push(new RouteItem(path, route));
    		});
    	} else {
    		// We have an object, so iterate on its own properties
    		Object.keys(routes).forEach(path => {
    			routesList.push(new RouteItem(path, routes[path]));
    		});
    	}

    	// Props for the component to render
    	let component = null;

    	let componentParams = null;
    	let props = {};

    	// Event dispatcher from Svelte
    	const dispatch = createEventDispatcher();

    	// Just like dispatch, but executes on the next iteration of the event loop
    	async function dispatchNextTick(name, detail) {
    		// Execute this code when the current call stack is complete
    		await tick();

    		dispatch(name, detail);
    	}

    	// If this is set, then that means we have popped into this var the state of our last scroll position
    	let previousScrollState = null;

    	let popStateChanged = null;

    	if (restoreScrollState) {
    		popStateChanged = event => {
    			// If this event was from our history.replaceState, event.state will contain
    			// our scroll history. Otherwise, event.state will be null (like on forward
    			// navigation)
    			if (event.state && event.state.__svelte_spa_router_scrollY) {
    				previousScrollState = event.state;
    			} else {
    				previousScrollState = null;
    			}
    		};

    		// This is removed in the destroy() invocation below
    		window.addEventListener('popstate', popStateChanged);

    		afterUpdate(() => {
    			// If this exists, then this is a back navigation: restore the scroll position
    			if (previousScrollState) {
    				window.scrollTo(previousScrollState.__svelte_spa_router_scrollX, previousScrollState.__svelte_spa_router_scrollY);
    			} else {
    				// Otherwise this is a forward navigation: scroll to top
    				window.scrollTo(0, 0);
    			}
    		});
    	}

    	// Always have the latest value of loc
    	let lastLoc = null;

    	// Current object of the component loaded
    	let componentObj = null;

    	// Handle hash change events
    	// Listen to changes in the $loc store and update the page
    	// Do not use the $: syntax because it gets triggered by too many things
    	const unsubscribeLoc = loc.subscribe(async newLoc => {
    		lastLoc = newLoc;

    		// Find a route matching the location
    		let i = 0;

    		while (i < routesList.length) {
    			const match = routesList[i].match(newLoc.location);

    			if (!match) {
    				i++;
    				continue;
    			}

    			const detail = {
    				route: routesList[i].path,
    				location: newLoc.location,
    				querystring: newLoc.querystring,
    				userData: routesList[i].userData,
    				params: match && typeof match == 'object' && Object.keys(match).length
    				? match
    				: null
    			};

    			// Check if the route can be loaded - if all conditions succeed
    			if (!await routesList[i].checkConditions(detail)) {
    				// Don't display anything
    				$$invalidate(0, component = null);

    				componentObj = null;

    				// Trigger an event to notify the user, then exit
    				dispatchNextTick('conditionsFailed', detail);

    				return;
    			}

    			// Trigger an event to alert that we're loading the route
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoading', Object.assign({}, detail));

    			// If there's a component to show while we're loading the route, display it
    			const obj = routesList[i].component;

    			// Do not replace the component if we're loading the same one as before, to avoid the route being unmounted and re-mounted
    			if (componentObj != obj) {
    				if (obj.loading) {
    					$$invalidate(0, component = obj.loading);
    					componentObj = obj;
    					$$invalidate(1, componentParams = obj.loadingParams);
    					$$invalidate(2, props = {});

    					// Trigger the routeLoaded event for the loading component
    					// Create a copy of detail so we don't modify the object for the dynamic route (and the dynamic route doesn't modify our object too)
    					dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    						component,
    						name: component.name,
    						params: componentParams
    					}));
    				} else {
    					$$invalidate(0, component = null);
    					componentObj = null;
    				}

    				// Invoke the Promise
    				const loaded = await obj();

    				// Now that we're here, after the promise resolved, check if we still want this component, as the user might have navigated to another page in the meanwhile
    				if (newLoc != lastLoc) {
    					// Don't update the component, just exit
    					return;
    				}

    				// If there is a "default" property, which is used by async routes, then pick that
    				$$invalidate(0, component = loaded && loaded.default || loaded);

    				componentObj = obj;
    			}

    			// Set componentParams only if we have a match, to avoid a warning similar to `<Component> was created with unknown prop 'params'`
    			// Of course, this assumes that developers always add a "params" prop when they are expecting parameters
    			if (match && typeof match == 'object' && Object.keys(match).length) {
    				$$invalidate(1, componentParams = match);
    			} else {
    				$$invalidate(1, componentParams = null);
    			}

    			// Set static props, if any
    			$$invalidate(2, props = routesList[i].props);

    			// Dispatch the routeLoaded event then exit
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    				component,
    				name: component.name,
    				params: componentParams
    			})).then(() => {
    				params.set(componentParams);
    			});

    			return;
    		}

    		// If we're still here, there was no match, so show the empty component
    		$$invalidate(0, component = null);

    		componentObj = null;
    		params.set(undefined);
    	});

    	onDestroy(() => {
    		unsubscribeLoc();
    		popStateChanged && window.removeEventListener('popstate', popStateChanged);
    	});

    	const writable_props = ['routes', 'prefix', 'restoreScrollState'];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	function routeEvent_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function routeEvent_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    	};

    	$$self.$capture_state = () => ({
    		readable,
    		writable,
    		derived,
    		tick,
    		_wrap: wrap$1,
    		wrap,
    		getLocation,
    		loc,
    		location,
    		querystring,
    		params,
    		push,
    		pop,
    		replace,
    		link,
    		updateLink,
    		linkOpts,
    		scrollstateHistoryHandler,
    		onDestroy,
    		createEventDispatcher,
    		afterUpdate,
    		parse,
    		routes,
    		prefix,
    		restoreScrollState,
    		RouteItem,
    		routesList,
    		component,
    		componentParams,
    		props,
    		dispatch,
    		dispatchNextTick,
    		previousScrollState,
    		popStateChanged,
    		lastLoc,
    		componentObj,
    		unsubscribeLoc
    	});

    	$$self.$inject_state = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    		if ('component' in $$props) $$invalidate(0, component = $$props.component);
    		if ('componentParams' in $$props) $$invalidate(1, componentParams = $$props.componentParams);
    		if ('props' in $$props) $$invalidate(2, props = $$props.props);
    		if ('previousScrollState' in $$props) previousScrollState = $$props.previousScrollState;
    		if ('popStateChanged' in $$props) popStateChanged = $$props.popStateChanged;
    		if ('lastLoc' in $$props) lastLoc = $$props.lastLoc;
    		if ('componentObj' in $$props) componentObj = $$props.componentObj;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*restoreScrollState*/ 32) {
    			// Update history.scrollRestoration depending on restoreScrollState
    			history.scrollRestoration = restoreScrollState ? 'manual' : 'auto';
    		}
    	};

    	return [
    		component,
    		componentParams,
    		props,
    		routes,
    		prefix,
    		restoreScrollState,
    		routeEvent_handler,
    		routeEvent_handler_1
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {
    			routes: 3,
    			prefix: 4,
    			restoreScrollState: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get routes() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routes(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get prefix() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set prefix(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get restoreScrollState() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set restoreScrollState(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\NavButton.svelte generated by Svelte v3.48.0 */

    const file$d = "src\\components\\NavButton.svelte";

    function create_fragment$d(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			attr_dev(a, "href", /*href*/ ctx[0]);
    			attr_dev(a, "class", "svelte-aeo9kc");
    			add_location(a, file$d, 16, 0, 334);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", prevent_default(scrollIntoView), false, true, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*href*/ 1) {
    				attr_dev(a, "href", /*href*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function scrollIntoView({ currentTarget }) {
    	const el = document.querySelector(currentTarget.getAttribute('href'));
    	if (!el) return;
    	el.scrollIntoView({ behavior: 'smooth' });
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavButton', slots, ['default']);
    	let { href } = $$props;
    	const writable_props = ['href'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NavButton> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('href' in $$props) $$invalidate(0, href = $$props.href);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ href, scrollIntoView });

    	$$self.$inject_state = $$props => {
    		if ('href' in $$props) $$invalidate(0, href = $$props.href);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [href, $$scope, slots];
    }

    class NavButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, { href: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavButton",
    			options,
    			id: create_fragment$d.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*href*/ ctx[0] === undefined && !('href' in props)) {
    			console.warn("<NavButton> was created without expected prop 'href'");
    		}
    	}

    	get href() {
    		throw new Error("<NavButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<NavButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\NavBar.svelte generated by Svelte v3.48.0 */
    const file$c = "src\\components\\NavBar.svelte";

    // (9:4) <NavButton href="#experience">
    function create_default_slot_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("experience");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(9:4) <NavButton href=\\\"#experience\\\">",
    		ctx
    	});

    	return block;
    }

    // (10:4) <NavButton href="#work">
    function create_default_slot$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("work");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(10:4) <NavButton href=\\\"#work\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let div;
    	let navbutton0;
    	let t;
    	let navbutton1;
    	let current;

    	navbutton0 = new NavButton({
    			props: {
    				href: "#experience",
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	navbutton1 = new NavButton({
    			props: {
    				href: "#work",
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(navbutton0.$$.fragment);
    			t = space();
    			create_component(navbutton1.$$.fragment);
    			attr_dev(div, "id", "nav");
    			attr_dev(div, "class", "svelte-rb26hs");
    			add_location(div, file$c, 7, 0, 125);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(navbutton0, div, null);
    			append_dev(div, t);
    			mount_component(navbutton1, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const navbutton0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				navbutton0_changes.$$scope = { dirty, ctx };
    			}

    			navbutton0.$set(navbutton0_changes);
    			const navbutton1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				navbutton1_changes.$$scope = { dirty, ctx };
    			}

    			navbutton1.$set(navbutton1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbutton0.$$.fragment, local);
    			transition_in(navbutton1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbutton0.$$.fragment, local);
    			transition_out(navbutton1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(navbutton0);
    			destroy_component(navbutton1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavBar', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NavBar> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ NavButton });
    	return [];
    }

    class NavBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavBar",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    /*!
     * 
     *   typed.js - A JavaScript Typing Animation Library
     *   Author: Matt Boldt <me@mattboldt.com>
     *   Version: v2.0.12
     *   Url: https://github.com/mattboldt/typed.js
     *   License(s): MIT
     * 
     */

    var typed = createCommonjsModule(function (module, exports) {
    (function webpackUniversalModuleDefinition(root, factory) {
    	module.exports = factory();
    })(commonjsGlobal, function() {
    return /******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
    /******/
    /******/ 		// Check if module is in cache
    /******/ 		if(installedModules[moduleId])
    /******/ 			return installedModules[moduleId].exports;
    /******/
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = installedModules[moduleId] = {
    /******/ 			exports: {},
    /******/ 			id: moduleId,
    /******/ 			loaded: false
    /******/ 		};
    /******/
    /******/ 		// Execute the module function
    /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ 		// Flag the module as loaded
    /******/ 		module.loaded = true;
    /******/
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;
    /******/
    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(0);
    /******/ })
    /************************************************************************/
    /******/ ([
    /* 0 */
    /***/ (function(module, exports, __webpack_require__) {
    	
    	Object.defineProperty(exports, '__esModule', {
    	  value: true
    	});
    	
    	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
    	
    	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
    	
    	var _initializerJs = __webpack_require__(1);
    	
    	var _htmlParserJs = __webpack_require__(3);
    	
    	/**
    	 * Welcome to Typed.js!
    	 * @param {string} elementId HTML element ID _OR_ HTML element
    	 * @param {object} options options object
    	 * @returns {object} a new Typed object
    	 */
    	
    	var Typed = (function () {
    	  function Typed(elementId, options) {
    	    _classCallCheck(this, Typed);
    	
    	    // Initialize it up
    	    _initializerJs.initializer.load(this, options, elementId);
    	    // All systems go!
    	    this.begin();
    	  }
    	
    	  /**
    	   * Toggle start() and stop() of the Typed instance
    	   * @public
    	   */
    	
    	  _createClass(Typed, [{
    	    key: 'toggle',
    	    value: function toggle() {
    	      this.pause.status ? this.start() : this.stop();
    	    }
    	
    	    /**
    	     * Stop typing / backspacing and enable cursor blinking
    	     * @public
    	     */
    	  }, {
    	    key: 'stop',
    	    value: function stop() {
    	      if (this.typingComplete) return;
    	      if (this.pause.status) return;
    	      this.toggleBlinking(true);
    	      this.pause.status = true;
    	      this.options.onStop(this.arrayPos, this);
    	    }
    	
    	    /**
    	     * Start typing / backspacing after being stopped
    	     * @public
    	     */
    	  }, {
    	    key: 'start',
    	    value: function start() {
    	      if (this.typingComplete) return;
    	      if (!this.pause.status) return;
    	      this.pause.status = false;
    	      if (this.pause.typewrite) {
    	        this.typewrite(this.pause.curString, this.pause.curStrPos);
    	      } else {
    	        this.backspace(this.pause.curString, this.pause.curStrPos);
    	      }
    	      this.options.onStart(this.arrayPos, this);
    	    }
    	
    	    /**
    	     * Destroy this instance of Typed
    	     * @public
    	     */
    	  }, {
    	    key: 'destroy',
    	    value: function destroy() {
    	      this.reset(false);
    	      this.options.onDestroy(this);
    	    }
    	
    	    /**
    	     * Reset Typed and optionally restarts
    	     * @param {boolean} restart
    	     * @public
    	     */
    	  }, {
    	    key: 'reset',
    	    value: function reset() {
    	      var restart = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
    	
    	      clearInterval(this.timeout);
    	      this.replaceText('');
    	      if (this.cursor && this.cursor.parentNode) {
    	        this.cursor.parentNode.removeChild(this.cursor);
    	        this.cursor = null;
    	      }
    	      this.strPos = 0;
    	      this.arrayPos = 0;
    	      this.curLoop = 0;
    	      if (restart) {
    	        this.insertCursor();
    	        this.options.onReset(this);
    	        this.begin();
    	      }
    	    }
    	
    	    /**
    	     * Begins the typing animation
    	     * @private
    	     */
    	  }, {
    	    key: 'begin',
    	    value: function begin() {
    	      var _this = this;
    	
    	      this.options.onBegin(this);
    	      this.typingComplete = false;
    	      this.shuffleStringsIfNeeded(this);
    	      this.insertCursor();
    	      if (this.bindInputFocusEvents) this.bindFocusEvents();
    	      this.timeout = setTimeout(function () {
    	        // Check if there is some text in the element, if yes start by backspacing the default message
    	        if (!_this.currentElContent || _this.currentElContent.length === 0) {
    	          _this.typewrite(_this.strings[_this.sequence[_this.arrayPos]], _this.strPos);
    	        } else {
    	          // Start typing
    	          _this.backspace(_this.currentElContent, _this.currentElContent.length);
    	        }
    	      }, this.startDelay);
    	    }
    	
    	    /**
    	     * Called for each character typed
    	     * @param {string} curString the current string in the strings array
    	     * @param {number} curStrPos the current position in the curString
    	     * @private
    	     */
    	  }, {
    	    key: 'typewrite',
    	    value: function typewrite(curString, curStrPos) {
    	      var _this2 = this;
    	
    	      if (this.fadeOut && this.el.classList.contains(this.fadeOutClass)) {
    	        this.el.classList.remove(this.fadeOutClass);
    	        if (this.cursor) this.cursor.classList.remove(this.fadeOutClass);
    	      }
    	
    	      var humanize = this.humanizer(this.typeSpeed);
    	      var numChars = 1;
    	
    	      if (this.pause.status === true) {
    	        this.setPauseStatus(curString, curStrPos, true);
    	        return;
    	      }
    	
    	      // contain typing function in a timeout humanize'd delay
    	      this.timeout = setTimeout(function () {
    	        // skip over any HTML chars
    	        curStrPos = _htmlParserJs.htmlParser.typeHtmlChars(curString, curStrPos, _this2);
    	
    	        var pauseTime = 0;
    	        var substr = curString.substr(curStrPos);
    	        // check for an escape character before a pause value
    	        // format: \^\d+ .. eg: ^1000 .. should be able to print the ^ too using ^^
    	        // single ^ are removed from string
    	        if (substr.charAt(0) === '^') {
    	          if (/^\^\d+/.test(substr)) {
    	            var skip = 1; // skip at least 1
    	            substr = /\d+/.exec(substr)[0];
    	            skip += substr.length;
    	            pauseTime = parseInt(substr);
    	            _this2.temporaryPause = true;
    	            _this2.options.onTypingPaused(_this2.arrayPos, _this2);
    	            // strip out the escape character and pause value so they're not printed
    	            curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
    	            _this2.toggleBlinking(true);
    	          }
    	        }
    	
    	        // check for skip characters formatted as
    	        // "this is a `string to print NOW` ..."
    	        if (substr.charAt(0) === '`') {
    	          while (curString.substr(curStrPos + numChars).charAt(0) !== '`') {
    	            numChars++;
    	            if (curStrPos + numChars > curString.length) break;
    	          }
    	          // strip out the escape characters and append all the string in between
    	          var stringBeforeSkip = curString.substring(0, curStrPos);
    	          var stringSkipped = curString.substring(stringBeforeSkip.length + 1, curStrPos + numChars);
    	          var stringAfterSkip = curString.substring(curStrPos + numChars + 1);
    	          curString = stringBeforeSkip + stringSkipped + stringAfterSkip;
    	          numChars--;
    	        }
    	
    	        // timeout for any pause after a character
    	        _this2.timeout = setTimeout(function () {
    	          // Accounts for blinking while paused
    	          _this2.toggleBlinking(false);
    	
    	          // We're done with this sentence!
    	          if (curStrPos >= curString.length) {
    	            _this2.doneTyping(curString, curStrPos);
    	          } else {
    	            _this2.keepTyping(curString, curStrPos, numChars);
    	          }
    	          // end of character pause
    	          if (_this2.temporaryPause) {
    	            _this2.temporaryPause = false;
    	            _this2.options.onTypingResumed(_this2.arrayPos, _this2);
    	          }
    	        }, pauseTime);
    	
    	        // humanized value for typing
    	      }, humanize);
    	    }
    	
    	    /**
    	     * Continue to the next string & begin typing
    	     * @param {string} curString the current string in the strings array
    	     * @param {number} curStrPos the current position in the curString
    	     * @private
    	     */
    	  }, {
    	    key: 'keepTyping',
    	    value: function keepTyping(curString, curStrPos, numChars) {
    	      // call before functions if applicable
    	      if (curStrPos === 0) {
    	        this.toggleBlinking(false);
    	        this.options.preStringTyped(this.arrayPos, this);
    	      }
    	      // start typing each new char into existing string
    	      // curString: arg, this.el.html: original text inside element
    	      curStrPos += numChars;
    	      var nextString = curString.substr(0, curStrPos);
    	      this.replaceText(nextString);
    	      // loop the function
    	      this.typewrite(curString, curStrPos);
    	    }
    	
    	    /**
    	     * We're done typing the current string
    	     * @param {string} curString the current string in the strings array
    	     * @param {number} curStrPos the current position in the curString
    	     * @private
    	     */
    	  }, {
    	    key: 'doneTyping',
    	    value: function doneTyping(curString, curStrPos) {
    	      var _this3 = this;
    	
    	      // fires callback function
    	      this.options.onStringTyped(this.arrayPos, this);
    	      this.toggleBlinking(true);
    	      // is this the final string
    	      if (this.arrayPos === this.strings.length - 1) {
    	        // callback that occurs on the last typed string
    	        this.complete();
    	        // quit if we wont loop back
    	        if (this.loop === false || this.curLoop === this.loopCount) {
    	          return;
    	        }
    	      }
    	      this.timeout = setTimeout(function () {
    	        _this3.backspace(curString, curStrPos);
    	      }, this.backDelay);
    	    }
    	
    	    /**
    	     * Backspaces 1 character at a time
    	     * @param {string} curString the current string in the strings array
    	     * @param {number} curStrPos the current position in the curString
    	     * @private
    	     */
    	  }, {
    	    key: 'backspace',
    	    value: function backspace(curString, curStrPos) {
    	      var _this4 = this;
    	
    	      if (this.pause.status === true) {
    	        this.setPauseStatus(curString, curStrPos, false);
    	        return;
    	      }
    	      if (this.fadeOut) return this.initFadeOut();
    	
    	      this.toggleBlinking(false);
    	      var humanize = this.humanizer(this.backSpeed);
    	
    	      this.timeout = setTimeout(function () {
    	        curStrPos = _htmlParserJs.htmlParser.backSpaceHtmlChars(curString, curStrPos, _this4);
    	        // replace text with base text + typed characters
    	        var curStringAtPosition = curString.substr(0, curStrPos);
    	        _this4.replaceText(curStringAtPosition);
    	
    	        // if smartBack is enabled
    	        if (_this4.smartBackspace) {
    	          // the remaining part of the current string is equal of the same part of the new string
    	          var nextString = _this4.strings[_this4.arrayPos + 1];
    	          if (nextString && curStringAtPosition === nextString.substr(0, curStrPos)) {
    	            _this4.stopNum = curStrPos;
    	          } else {
    	            _this4.stopNum = 0;
    	          }
    	        }
    	
    	        // if the number (id of character in current string) is
    	        // less than the stop number, keep going
    	        if (curStrPos > _this4.stopNum) {
    	          // subtract characters one by one
    	          curStrPos--;
    	          // loop the function
    	          _this4.backspace(curString, curStrPos);
    	        } else if (curStrPos <= _this4.stopNum) {
    	          // if the stop number has been reached, increase
    	          // array position to next string
    	          _this4.arrayPos++;
    	          // When looping, begin at the beginning after backspace complete
    	          if (_this4.arrayPos === _this4.strings.length) {
    	            _this4.arrayPos = 0;
    	            _this4.options.onLastStringBackspaced();
    	            _this4.shuffleStringsIfNeeded();
    	            _this4.begin();
    	          } else {
    	            _this4.typewrite(_this4.strings[_this4.sequence[_this4.arrayPos]], curStrPos);
    	          }
    	        }
    	        // humanized value for typing
    	      }, humanize);
    	    }
    	
    	    /**
    	     * Full animation is complete
    	     * @private
    	     */
    	  }, {
    	    key: 'complete',
    	    value: function complete() {
    	      this.options.onComplete(this);
    	      if (this.loop) {
    	        this.curLoop++;
    	      } else {
    	        this.typingComplete = true;
    	      }
    	    }
    	
    	    /**
    	     * Has the typing been stopped
    	     * @param {string} curString the current string in the strings array
    	     * @param {number} curStrPos the current position in the curString
    	     * @param {boolean} isTyping
    	     * @private
    	     */
    	  }, {
    	    key: 'setPauseStatus',
    	    value: function setPauseStatus(curString, curStrPos, isTyping) {
    	      this.pause.typewrite = isTyping;
    	      this.pause.curString = curString;
    	      this.pause.curStrPos = curStrPos;
    	    }
    	
    	    /**
    	     * Toggle the blinking cursor
    	     * @param {boolean} isBlinking
    	     * @private
    	     */
    	  }, {
    	    key: 'toggleBlinking',
    	    value: function toggleBlinking(isBlinking) {
    	      if (!this.cursor) return;
    	      // if in paused state, don't toggle blinking a 2nd time
    	      if (this.pause.status) return;
    	      if (this.cursorBlinking === isBlinking) return;
    	      this.cursorBlinking = isBlinking;
    	      if (isBlinking) {
    	        this.cursor.classList.add('typed-cursor--blink');
    	      } else {
    	        this.cursor.classList.remove('typed-cursor--blink');
    	      }
    	    }
    	
    	    /**
    	     * Speed in MS to type
    	     * @param {number} speed
    	     * @private
    	     */
    	  }, {
    	    key: 'humanizer',
    	    value: function humanizer(speed) {
    	      return Math.round(Math.random() * speed / 2) + speed;
    	    }
    	
    	    /**
    	     * Shuffle the sequence of the strings array
    	     * @private
    	     */
    	  }, {
    	    key: 'shuffleStringsIfNeeded',
    	    value: function shuffleStringsIfNeeded() {
    	      if (!this.shuffle) return;
    	      this.sequence = this.sequence.sort(function () {
    	        return Math.random() - 0.5;
    	      });
    	    }
    	
    	    /**
    	     * Adds a CSS class to fade out current string
    	     * @private
    	     */
    	  }, {
    	    key: 'initFadeOut',
    	    value: function initFadeOut() {
    	      var _this5 = this;
    	
    	      this.el.className += ' ' + this.fadeOutClass;
    	      if (this.cursor) this.cursor.className += ' ' + this.fadeOutClass;
    	      return setTimeout(function () {
    	        _this5.arrayPos++;
    	        _this5.replaceText('');
    	
    	        // Resets current string if end of loop reached
    	        if (_this5.strings.length > _this5.arrayPos) {
    	          _this5.typewrite(_this5.strings[_this5.sequence[_this5.arrayPos]], 0);
    	        } else {
    	          _this5.typewrite(_this5.strings[0], 0);
    	          _this5.arrayPos = 0;
    	        }
    	      }, this.fadeOutDelay);
    	    }
    	
    	    /**
    	     * Replaces current text in the HTML element
    	     * depending on element type
    	     * @param {string} str
    	     * @private
    	     */
    	  }, {
    	    key: 'replaceText',
    	    value: function replaceText(str) {
    	      if (this.attr) {
    	        this.el.setAttribute(this.attr, str);
    	      } else {
    	        if (this.isInput) {
    	          this.el.value = str;
    	        } else if (this.contentType === 'html') {
    	          this.el.innerHTML = str;
    	        } else {
    	          this.el.textContent = str;
    	        }
    	      }
    	    }
    	
    	    /**
    	     * If using input elements, bind focus in order to
    	     * start and stop the animation
    	     * @private
    	     */
    	  }, {
    	    key: 'bindFocusEvents',
    	    value: function bindFocusEvents() {
    	      var _this6 = this;
    	
    	      if (!this.isInput) return;
    	      this.el.addEventListener('focus', function (e) {
    	        _this6.stop();
    	      });
    	      this.el.addEventListener('blur', function (e) {
    	        if (_this6.el.value && _this6.el.value.length !== 0) {
    	          return;
    	        }
    	        _this6.start();
    	      });
    	    }
    	
    	    /**
    	     * On init, insert the cursor element
    	     * @private
    	     */
    	  }, {
    	    key: 'insertCursor',
    	    value: function insertCursor() {
    	      if (!this.showCursor) return;
    	      if (this.cursor) return;
    	      this.cursor = document.createElement('span');
    	      this.cursor.className = 'typed-cursor';
    	      this.cursor.setAttribute('aria-hidden', true);
    	      this.cursor.innerHTML = this.cursorChar;
    	      this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling);
    	    }
    	  }]);
    	
    	  return Typed;
    	})();
    	
    	exports['default'] = Typed;
    	module.exports = exports['default'];

    /***/ }),
    /* 1 */
    /***/ (function(module, exports, __webpack_require__) {
    	
    	Object.defineProperty(exports, '__esModule', {
    	  value: true
    	});
    	
    	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
    	
    	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
    	
    	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
    	
    	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
    	
    	var _defaultsJs = __webpack_require__(2);
    	
    	var _defaultsJs2 = _interopRequireDefault(_defaultsJs);
    	
    	/**
    	 * Initialize the Typed object
    	 */
    	
    	var Initializer = (function () {
    	  function Initializer() {
    	    _classCallCheck(this, Initializer);
    	  }
    	
    	  _createClass(Initializer, [{
    	    key: 'load',
    	
    	    /**
    	     * Load up defaults & options on the Typed instance
    	     * @param {Typed} self instance of Typed
    	     * @param {object} options options object
    	     * @param {string} elementId HTML element ID _OR_ instance of HTML element
    	     * @private
    	     */
    	
    	    value: function load(self, options, elementId) {
    	      // chosen element to manipulate text
    	      if (typeof elementId === 'string') {
    	        self.el = document.querySelector(elementId);
    	      } else {
    	        self.el = elementId;
    	      }
    	
    	      self.options = _extends({}, _defaultsJs2['default'], options);
    	
    	      // attribute to type into
    	      self.isInput = self.el.tagName.toLowerCase() === 'input';
    	      self.attr = self.options.attr;
    	      self.bindInputFocusEvents = self.options.bindInputFocusEvents;
    	
    	      // show cursor
    	      self.showCursor = self.isInput ? false : self.options.showCursor;
    	
    	      // custom cursor
    	      self.cursorChar = self.options.cursorChar;
    	
    	      // Is the cursor blinking
    	      self.cursorBlinking = true;
    	
    	      // text content of element
    	      self.elContent = self.attr ? self.el.getAttribute(self.attr) : self.el.textContent;
    	
    	      // html or plain text
    	      self.contentType = self.options.contentType;
    	
    	      // typing speed
    	      self.typeSpeed = self.options.typeSpeed;
    	
    	      // add a delay before typing starts
    	      self.startDelay = self.options.startDelay;
    	
    	      // backspacing speed
    	      self.backSpeed = self.options.backSpeed;
    	
    	      // only backspace what doesn't match the previous string
    	      self.smartBackspace = self.options.smartBackspace;
    	
    	      // amount of time to wait before backspacing
    	      self.backDelay = self.options.backDelay;
    	
    	      // Fade out instead of backspace
    	      self.fadeOut = self.options.fadeOut;
    	      self.fadeOutClass = self.options.fadeOutClass;
    	      self.fadeOutDelay = self.options.fadeOutDelay;
    	
    	      // variable to check whether typing is currently paused
    	      self.isPaused = false;
    	
    	      // input strings of text
    	      self.strings = self.options.strings.map(function (s) {
    	        return s.trim();
    	      });
    	
    	      // div containing strings
    	      if (typeof self.options.stringsElement === 'string') {
    	        self.stringsElement = document.querySelector(self.options.stringsElement);
    	      } else {
    	        self.stringsElement = self.options.stringsElement;
    	      }
    	
    	      if (self.stringsElement) {
    	        self.strings = [];
    	        self.stringsElement.style.display = 'none';
    	        var strings = Array.prototype.slice.apply(self.stringsElement.children);
    	        var stringsLength = strings.length;
    	
    	        if (stringsLength) {
    	          for (var i = 0; i < stringsLength; i += 1) {
    	            var stringEl = strings[i];
    	            self.strings.push(stringEl.innerHTML.trim());
    	          }
    	        }
    	      }
    	
    	      // character number position of current string
    	      self.strPos = 0;
    	
    	      // current array position
    	      self.arrayPos = 0;
    	
    	      // index of string to stop backspacing on
    	      self.stopNum = 0;
    	
    	      // Looping logic
    	      self.loop = self.options.loop;
    	      self.loopCount = self.options.loopCount;
    	      self.curLoop = 0;
    	
    	      // shuffle the strings
    	      self.shuffle = self.options.shuffle;
    	      // the order of strings
    	      self.sequence = [];
    	
    	      self.pause = {
    	        status: false,
    	        typewrite: true,
    	        curString: '',
    	        curStrPos: 0
    	      };
    	
    	      // When the typing is complete (when not looped)
    	      self.typingComplete = false;
    	
    	      // Set the order in which the strings are typed
    	      for (var i in self.strings) {
    	        self.sequence[i] = i;
    	      }
    	
    	      // If there is some text in the element
    	      self.currentElContent = this.getCurrentElContent(self);
    	
    	      self.autoInsertCss = self.options.autoInsertCss;
    	
    	      this.appendAnimationCss(self);
    	    }
    	  }, {
    	    key: 'getCurrentElContent',
    	    value: function getCurrentElContent(self) {
    	      var elContent = '';
    	      if (self.attr) {
    	        elContent = self.el.getAttribute(self.attr);
    	      } else if (self.isInput) {
    	        elContent = self.el.value;
    	      } else if (self.contentType === 'html') {
    	        elContent = self.el.innerHTML;
    	      } else {
    	        elContent = self.el.textContent;
    	      }
    	      return elContent;
    	    }
    	  }, {
    	    key: 'appendAnimationCss',
    	    value: function appendAnimationCss(self) {
    	      var cssDataName = 'data-typed-js-css';
    	      if (!self.autoInsertCss) {
    	        return;
    	      }
    	      if (!self.showCursor && !self.fadeOut) {
    	        return;
    	      }
    	      if (document.querySelector('[' + cssDataName + ']')) {
    	        return;
    	      }
    	
    	      var css = document.createElement('style');
    	      css.type = 'text/css';
    	      css.setAttribute(cssDataName, true);
    	
    	      var innerCss = '';
    	      if (self.showCursor) {
    	        innerCss += '\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      ';
    	      }
    	      if (self.fadeOut) {
    	        innerCss += '\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      ';
    	      }
    	      if (css.length === 0) {
    	        return;
    	      }
    	      css.innerHTML = innerCss;
    	      document.body.appendChild(css);
    	    }
    	  }]);
    	
    	  return Initializer;
    	})();
    	
    	exports['default'] = Initializer;
    	var initializer = new Initializer();
    	exports.initializer = initializer;

    /***/ }),
    /* 2 */
    /***/ (function(module, exports) {
    	
    	Object.defineProperty(exports, '__esModule', {
    	  value: true
    	});
    	var defaults = {
    	  /**
    	   * @property {array} strings strings to be typed
    	   * @property {string} stringsElement ID of element containing string children
    	   */
    	  strings: ['These are the default values...', 'You know what you should do?', 'Use your own!', 'Have a great day!'],
    	  stringsElement: null,
    	
    	  /**
    	   * @property {number} typeSpeed type speed in milliseconds
    	   */
    	  typeSpeed: 0,
    	
    	  /**
    	   * @property {number} startDelay time before typing starts in milliseconds
    	   */
    	  startDelay: 0,
    	
    	  /**
    	   * @property {number} backSpeed backspacing speed in milliseconds
    	   */
    	  backSpeed: 0,
    	
    	  /**
    	   * @property {boolean} smartBackspace only backspace what doesn't match the previous string
    	   */
    	  smartBackspace: true,
    	
    	  /**
    	   * @property {boolean} shuffle shuffle the strings
    	   */
    	  shuffle: false,
    	
    	  /**
    	   * @property {number} backDelay time before backspacing in milliseconds
    	   */
    	  backDelay: 700,
    	
    	  /**
    	   * @property {boolean} fadeOut Fade out instead of backspace
    	   * @property {string} fadeOutClass css class for fade animation
    	   * @property {boolean} fadeOutDelay Fade out delay in milliseconds
    	   */
    	  fadeOut: false,
    	  fadeOutClass: 'typed-fade-out',
    	  fadeOutDelay: 500,
    	
    	  /**
    	   * @property {boolean} loop loop strings
    	   * @property {number} loopCount amount of loops
    	   */
    	  loop: false,
    	  loopCount: Infinity,
    	
    	  /**
    	   * @property {boolean} showCursor show cursor
    	   * @property {string} cursorChar character for cursor
    	   * @property {boolean} autoInsertCss insert CSS for cursor and fadeOut into HTML <head>
    	   */
    	  showCursor: true,
    	  cursorChar: '|',
    	  autoInsertCss: true,
    	
    	  /**
    	   * @property {string} attr attribute for typing
    	   * Ex: input placeholder, value, or just HTML text
    	   */
    	  attr: null,
    	
    	  /**
    	   * @property {boolean} bindInputFocusEvents bind to focus and blur if el is text input
    	   */
    	  bindInputFocusEvents: false,
    	
    	  /**
    	   * @property {string} contentType 'html' or 'null' for plaintext
    	   */
    	  contentType: 'html',
    	
    	  /**
    	   * Before it begins typing
    	   * @param {Typed} self
    	   */
    	  onBegin: function onBegin(self) {},
    	
    	  /**
    	   * All typing is complete
    	   * @param {Typed} self
    	   */
    	  onComplete: function onComplete(self) {},
    	
    	  /**
    	   * Before each string is typed
    	   * @param {number} arrayPos
    	   * @param {Typed} self
    	   */
    	  preStringTyped: function preStringTyped(arrayPos, self) {},
    	
    	  /**
    	   * After each string is typed
    	   * @param {number} arrayPos
    	   * @param {Typed} self
    	   */
    	  onStringTyped: function onStringTyped(arrayPos, self) {},
    	
    	  /**
    	   * During looping, after last string is typed
    	   * @param {Typed} self
    	   */
    	  onLastStringBackspaced: function onLastStringBackspaced(self) {},
    	
    	  /**
    	   * Typing has been stopped
    	   * @param {number} arrayPos
    	   * @param {Typed} self
    	   */
    	  onTypingPaused: function onTypingPaused(arrayPos, self) {},
    	
    	  /**
    	   * Typing has been started after being stopped
    	   * @param {number} arrayPos
    	   * @param {Typed} self
    	   */
    	  onTypingResumed: function onTypingResumed(arrayPos, self) {},
    	
    	  /**
    	   * After reset
    	   * @param {Typed} self
    	   */
    	  onReset: function onReset(self) {},
    	
    	  /**
    	   * After stop
    	   * @param {number} arrayPos
    	   * @param {Typed} self
    	   */
    	  onStop: function onStop(arrayPos, self) {},
    	
    	  /**
    	   * After start
    	   * @param {number} arrayPos
    	   * @param {Typed} self
    	   */
    	  onStart: function onStart(arrayPos, self) {},
    	
    	  /**
    	   * After destroy
    	   * @param {Typed} self
    	   */
    	  onDestroy: function onDestroy(self) {}
    	};
    	
    	exports['default'] = defaults;
    	module.exports = exports['default'];

    /***/ }),
    /* 3 */
    /***/ (function(module, exports) {
    	
    	Object.defineProperty(exports, '__esModule', {
    	  value: true
    	});
    	
    	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
    	
    	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
    	
    	var HTMLParser = (function () {
    	  function HTMLParser() {
    	    _classCallCheck(this, HTMLParser);
    	  }
    	
    	  _createClass(HTMLParser, [{
    	    key: 'typeHtmlChars',
    	
    	    /**
    	     * Type HTML tags & HTML Characters
    	     * @param {string} curString Current string
    	     * @param {number} curStrPos Position in current string
    	     * @param {Typed} self instance of Typed
    	     * @returns {number} a new string position
    	     * @private
    	     */
    	
    	    value: function typeHtmlChars(curString, curStrPos, self) {
    	      if (self.contentType !== 'html') return curStrPos;
    	      var curChar = curString.substr(curStrPos).charAt(0);
    	      if (curChar === '<' || curChar === '&') {
    	        var endTag = '';
    	        if (curChar === '<') {
    	          endTag = '>';
    	        } else {
    	          endTag = ';';
    	        }
    	        while (curString.substr(curStrPos + 1).charAt(0) !== endTag) {
    	          curStrPos++;
    	          if (curStrPos + 1 > curString.length) {
    	            break;
    	          }
    	        }
    	        curStrPos++;
    	      }
    	      return curStrPos;
    	    }
    	
    	    /**
    	     * Backspace HTML tags and HTML Characters
    	     * @param {string} curString Current string
    	     * @param {number} curStrPos Position in current string
    	     * @param {Typed} self instance of Typed
    	     * @returns {number} a new string position
    	     * @private
    	     */
    	  }, {
    	    key: 'backSpaceHtmlChars',
    	    value: function backSpaceHtmlChars(curString, curStrPos, self) {
    	      if (self.contentType !== 'html') return curStrPos;
    	      var curChar = curString.substr(curStrPos).charAt(0);
    	      if (curChar === '>' || curChar === ';') {
    	        var endTag = '';
    	        if (curChar === '>') {
    	          endTag = '<';
    	        } else {
    	          endTag = '&';
    	        }
    	        while (curString.substr(curStrPos - 1).charAt(0) !== endTag) {
    	          curStrPos--;
    	          if (curStrPos < 0) {
    	            break;
    	          }
    	        }
    	        curStrPos--;
    	      }
    	      return curStrPos;
    	    }
    	  }]);
    	
    	  return HTMLParser;
    	})();
    	
    	exports['default'] = HTMLParser;
    	var htmlParser = new HTMLParser();
    	exports.htmlParser = htmlParser;

    /***/ })
    /******/ ])
    });
    });

    var Typed = /*@__PURE__*/getDefaultExportFromCjs(typed);

    /* src\components\Typed.svelte generated by Svelte v3.48.0 */
    const file$b = "src\\components\\Typed.svelte";

    function create_fragment$b(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "typed-element svelte-1kgeta6");
    			add_location(div, file$b, 2, 0, 25);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[3](div);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[3](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function throwError(message) {
    	throw new TypeError(message);
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Typed', slots, ['default']);
    	const $$slots = compute_slots(slots);
    	let typedObj = null;
    	let typedElement = null;

    	function initTypedJS() {
    		const $typed = typedElement.querySelector('.typing');

    		if ($$slots.default == undefined) {
    			throwError(`Just one child element allowed inside  component.`);
    		} else if ($$slots.default == true) {
    			typedObj = new Typed($typed, $$props);
    		}
    	}

    	onMount(() => {
    		initTypedJS();
    	});

    	onDestroy(() => {
    		typedObj.destroy();
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			typedElement = $$value;
    			$$invalidate(0, typedElement);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(6, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('$$scope' in $$new_props) $$invalidate(1, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		Typed,
    		onMount,
    		onDestroy,
    		typedObj,
    		typedElement,
    		throwError,
    		initTypedJS
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(6, $$props = assign(assign({}, $$props), $$new_props));
    		if ('typedObj' in $$props) typedObj = $$new_props.typedObj;
    		if ('typedElement' in $$props) $$invalidate(0, typedElement = $$new_props.typedElement);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [typedElement, $$scope, slots, div_binding];
    }

    class Typed_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Typed_1",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src\components\Mode.svelte generated by Svelte v3.48.0 */

    const file$a = "src\\components\\Mode.svelte";

    // (13:1) {:else}
    function create_else_block(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "images/moon.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "moon for toggle light mode");
    			add_location(img, file$a, 13, 4, 296);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(13:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (11:1) {#if darkMode }
    function create_if_block(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "images/sun.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "sun for toggle light mode");
    			add_location(img, file$a, 11, 4, 222);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(11:1) {#if darkMode }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let button;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*darkMode*/ ctx[0]) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			button = element("button");
    			if_block.c();
    			attr_dev(button, "class", "svelte-s2gsur");
    			add_location(button, file$a, 9, 0, 172);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			if_block.m(button, null);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*toggle*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(button, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Mode', slots, []);
    	let darkMode = false;

    	function toggle() {
    		$$invalidate(0, darkMode = !darkMode);
    		window.document.body.classList.toggle('dark-mode');
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Mode> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ darkMode, toggle });

    	$$self.$inject_state = $$props => {
    		if ('darkMode' in $$props) $$invalidate(0, darkMode = $$props.darkMode);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [darkMode, toggle];
    }

    class Mode extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Mode",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src\components\Name.svelte generated by Svelte v3.48.0 */
    const file$9 = "src\\components\\Name.svelte";

    // (16:6) <Mode>
    function create_default_slot_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Toggle");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(16:6) <Mode>",
    		ctx
    	});

    	return block;
    }

    // (18:2) <Typed strings={["I love web development,", "and data science,", "I'm not that great at them yet,", "but I'm trying my best :)", "oh and also, I think the Earth is flat."]} loop=true typeSpeed=9 startDelay=1200 backSpeed=9 backDelay=2600 cursorChar= "|">
    function create_default_slot(ctx) {
    	let h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			attr_dev(h2, "class", "typing svelte-12wi87k");
    			add_location(h2, file$9, 18, 1, 838);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(18:2) <Typed strings={[\\\"I love web development,\\\", \\\"and data science,\\\", \\\"I'm not that great at them yet,\\\", \\\"but I'm trying my best :)\\\", \\\"oh and also, I think the Earth is flat.\\\"]} loop=true typeSpeed=9 startDelay=1200 backSpeed=9 backDelay=2600 cursorChar= \\\"|\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let link0;
    	let t0;
    	let link1;
    	let t1;
    	let link2;
    	let t2;
    	let div1;
    	let p;
    	let t4;
    	let div0;
    	let h1;
    	let t6;
    	let mode;
    	let t7;
    	let typed;
    	let current;

    	mode = new Mode({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	typed = new Typed_1({
    			props: {
    				strings: [
    					"I love web development,",
    					"and data science,",
    					"I'm not that great at them yet,",
    					"but I'm trying my best :)",
    					"oh and also, I think the Earth is flat."
    				],
    				loop: "true",
    				typeSpeed: "9",
    				startDelay: "1200",
    				backSpeed: "9",
    				backDelay: "2600",
    				cursorChar: "|",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			link0 = element("link");
    			t0 = space();
    			link1 = element("link");
    			t1 = space();
    			link2 = element("link");
    			t2 = space();
    			div1 = element("div");
    			p = element("p");
    			p.textContent = "It's-a me,";
    			t4 = space();
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Melio";
    			t6 = space();
    			create_component(mode.$$.fragment);
    			t7 = space();
    			create_component(typed.$$.fragment);
    			attr_dev(link0, "rel", "preconnect");
    			attr_dev(link0, "href", "https://fonts.googleapis.com");
    			add_location(link0, file$9, 8, 0, 151);
    			attr_dev(link1, "rel", "preconnect");
    			attr_dev(link1, "href", "https://fonts.gstatic.com");
    			attr_dev(link1, "crossorigin", "");
    			add_location(link1, file$9, 9, 0, 212);
    			attr_dev(link2, "href", "https://fonts.googleapis.com/css2?family=Nixie+One&family=Open+Sans&family=Permanent+Marker&display=swap");
    			attr_dev(link2, "rel", "stylesheet");
    			add_location(link2, file$9, 10, 0, 282);
    			attr_dev(p, "class", "subheading svelte-12wi87k");
    			add_location(p, file$9, 12, 2, 443);
    			attr_dev(h1, "class", "neon-text svelte-12wi87k");
    			add_location(h1, file$9, 14, 6, 506);
    			attr_dev(div0, "id", "name");
    			attr_dev(div0, "class", "svelte-12wi87k");
    			add_location(div0, file$9, 13, 2, 483);
    			attr_dev(div1, "id", "container");
    			attr_dev(div1, "class", "svelte-12wi87k");
    			add_location(div1, file$9, 11, 0, 419);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, link0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, link1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, link2, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, p);
    			append_dev(div1, t4);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t6);
    			mount_component(mode, div0, null);
    			append_dev(div1, t7);
    			mount_component(typed, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const mode_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				mode_changes.$$scope = { dirty, ctx };
    			}

    			mode.$set(mode_changes);
    			const typed_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				typed_changes.$$scope = { dirty, ctx };
    			}

    			typed.$set(typed_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mode.$$.fragment, local);
    			transition_in(typed.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mode.$$.fragment, local);
    			transition_out(typed.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(link0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(link1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(link2);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    			destroy_component(mode);
    			destroy_component(typed);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Name', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Name> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Typed: Typed_1, Mode });
    	return [];
    }

    class Name extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Name",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src\components\Scroll.svelte generated by Svelte v3.48.0 */

    const file$8 = "src\\components\\Scroll.svelte";

    function create_fragment$8(ctx) {
    	let section;
    	let span2;
    	let span1;
    	let span0;

    	const block = {
    		c: function create() {
    			section = element("section");
    			span2 = element("span");
    			span1 = element("span");
    			span0 = element("span");
    			attr_dev(span0, "class", "scroll-icon__wheel-inner svelte-pj8byh");
    			add_location(span0, file$8, 5, 3, 132);
    			attr_dev(span1, "class", "scroll-icon__wheel-outer svelte-pj8byh");
    			add_location(span1, file$8, 4, 2, 88);
    			attr_dev(span2, "class", "scroll-icon svelte-pj8byh");
    			add_location(span2, file$8, 3, 3, 58);
    			attr_dev(section, "class", "example svelte-pj8byh");
    			add_location(section, file$8, 2, 1, 27);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, span2);
    			append_dev(span2, span1);
    			append_dev(span1, span0);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Scroll', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Scroll> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Scroll extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Scroll",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src\components\ScrollArrow.svelte generated by Svelte v3.48.0 */

    const file$7 = "src\\components\\ScrollArrow.svelte";

    function create_fragment$7(ctx) {
    	let p;
    	let t1;
    	let svg;
    	let polygon;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "scroll";
    			t1 = space();
    			svg = svg_element("svg");
    			polygon = svg_element("polygon");
    			attr_dev(p, "class", "svelte-1vm0wry");
    			add_location(p, file$7, 1, 0, 29);
    			attr_dev(polygon, "class", "arrow svelte-1vm0wry");
    			attr_dev(polygon, "points", "20.58,11.584 12.004,20.158 12.004,0 9.996,0 9.996,20.158 1.42,11.584 0,13.004 11,24\r\n        22,13.004 ");
    			add_location(polygon, file$7, 3, 2, 223);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "id", "svg-arrow-down");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			attr_dev(svg, "x", "0px");
    			attr_dev(svg, "y", "0px");
    			attr_dev(svg, "viewBox", "0 0 22 35");
    			attr_dev(svg, "xml:space", "preserve");
    			attr_dev(svg, "class", "svelte-1vm0wry");
    			add_location(svg, file$7, 2, 0, 44);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, svg, anchor);
    			append_dev(svg, polygon);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ScrollArrow', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ScrollArrow> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class ScrollArrow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ScrollArrow",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\components\ScrollToTop.svelte generated by Svelte v3.48.0 */

    const file$6 = "src\\components\\ScrollToTop.svelte";

    function create_fragment$6(ctx) {
    	let div;
    	let span;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span = element("span");
    			span.textContent = "arrow_circle_up";
    			attr_dev(span, "class", "material-symbols-outlined svelte-xozfiz");
    			add_location(span, file$6, 29, 57, 640);
    			attr_dev(div, "class", "back-to-top svelte-xozfiz");
    			toggle_class(div, "hidden", /*hidden*/ ctx[0]);
    			add_location(div, file$6, 29, 2, 585);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "scroll", /*handleOnScroll*/ ctx[1], false, false, false),
    					listen_dev(div, "click", goTop, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*hidden*/ 1) {
    				toggle_class(div, "hidden", /*hidden*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function goTop() {
    	document.body.scrollIntoView({ behavior: 'smooth' });
    }

    function scrollContainer() {
    	return document.documentElement || document.body;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ScrollToTop', slots, []);
    	let { showOnPx = 150 } = $$props;
    	let hidden = true;

    	function handleOnScroll() {
    		if (!scrollContainer()) {
    			return;
    		}

    		if (scrollContainer().scrollTop > showOnPx) {
    			$$invalidate(0, hidden = false);
    		} else {
    			$$invalidate(0, hidden = true);
    		}
    	}

    	const writable_props = ['showOnPx'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ScrollToTop> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('showOnPx' in $$props) $$invalidate(2, showOnPx = $$props.showOnPx);
    	};

    	$$self.$capture_state = () => ({
    		showOnPx,
    		hidden,
    		goTop,
    		scrollContainer,
    		handleOnScroll
    	});

    	$$self.$inject_state = $$props => {
    		if ('showOnPx' in $$props) $$invalidate(2, showOnPx = $$props.showOnPx);
    		if ('hidden' in $$props) $$invalidate(0, hidden = $$props.hidden);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [hidden, handleOnScroll, showOnPx];
    }

    class ScrollToTop extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { showOnPx: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ScrollToTop",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get showOnPx() {
    		throw new Error("<ScrollToTop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showOnPx(value) {
    		throw new Error("<ScrollToTop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function scale(node, { delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const sd = 1 - start;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (_t, u) => `
			transform: ${transform} scale(${1 - (sd * u)});
			opacity: ${target_opacity - (od * u)}
		`
        };
    }

    /* src\components\ExperienceEntry.svelte generated by Svelte v3.48.0 */

    const file$5 = "src\\components\\ExperienceEntry.svelte";

    function create_fragment$5(ctx) {
    	let h30;
    	let t0;
    	let t1;
    	let div2;
    	let div0;
    	let h31;
    	let t2;
    	let t3;
    	let h4;
    	let t4;
    	let t5;
    	let div1;
    	let p;
    	let t6;

    	const block = {
    		c: function create() {
    			h30 = element("h3");
    			t0 = text(/*org*/ ctx[0]);
    			t1 = space();
    			div2 = element("div");
    			div0 = element("div");
    			h31 = element("h3");
    			t2 = text(/*role*/ ctx[1]);
    			t3 = space();
    			h4 = element("h4");
    			t4 = text(/*time*/ ctx[2]);
    			t5 = space();
    			div1 = element("div");
    			p = element("p");
    			t6 = text(/*description*/ ctx[3]);
    			attr_dev(h30, "id", "org");
    			attr_dev(h30, "class", "svelte-g7286o");
    			add_location(h30, file$5, 8, 4, 154);
    			attr_dev(h31, "id", "role");
    			attr_dev(h31, "class", "svelte-g7286o");
    			add_location(h31, file$5, 12, 8, 236);
    			attr_dev(h4, "id", "time");
    			attr_dev(h4, "class", "svelte-g7286o");
    			add_location(h4, file$5, 13, 8, 271);
    			attr_dev(div0, "id", "sub-info");
    			attr_dev(div0, "class", "svelte-g7286o");
    			add_location(div0, file$5, 11, 4, 207);
    			attr_dev(p, "id", "description");
    			attr_dev(p, "class", "svelte-g7286o");
    			add_location(p, file$5, 17, 8, 358);
    			attr_dev(div1, "id", "description-container");
    			attr_dev(div1, "class", "svelte-g7286o");
    			add_location(div1, file$5, 16, 4, 316);
    			attr_dev(div2, "id", "container");
    			attr_dev(div2, "class", "svelte-g7286o");
    			add_location(div2, file$5, 9, 0, 179);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h30, anchor);
    			append_dev(h30, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, h31);
    			append_dev(h31, t2);
    			append_dev(div0, t3);
    			append_dev(div0, h4);
    			append_dev(h4, t4);
    			append_dev(div2, t5);
    			append_dev(div2, div1);
    			append_dev(div1, p);
    			append_dev(p, t6);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*org*/ 1) set_data_dev(t0, /*org*/ ctx[0]);
    			if (dirty & /*role*/ 2) set_data_dev(t2, /*role*/ ctx[1]);
    			if (dirty & /*time*/ 4) set_data_dev(t4, /*time*/ ctx[2]);
    			if (dirty & /*description*/ 8) set_data_dev(t6, /*description*/ ctx[3]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h30);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ExperienceEntry', slots, []);
    	let { org } = $$props;
    	let { role } = $$props;
    	let { time } = $$props;
    	let { description } = $$props;
    	const writable_props = ['org', 'role', 'time', 'description'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ExperienceEntry> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('org' in $$props) $$invalidate(0, org = $$props.org);
    		if ('role' in $$props) $$invalidate(1, role = $$props.role);
    		if ('time' in $$props) $$invalidate(2, time = $$props.time);
    		if ('description' in $$props) $$invalidate(3, description = $$props.description);
    	};

    	$$self.$capture_state = () => ({ org, role, time, description });

    	$$self.$inject_state = $$props => {
    		if ('org' in $$props) $$invalidate(0, org = $$props.org);
    		if ('role' in $$props) $$invalidate(1, role = $$props.role);
    		if ('time' in $$props) $$invalidate(2, time = $$props.time);
    		if ('description' in $$props) $$invalidate(3, description = $$props.description);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [org, role, time, description];
    }

    class ExperienceEntry extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { org: 0, role: 1, time: 2, description: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ExperienceEntry",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*org*/ ctx[0] === undefined && !('org' in props)) {
    			console.warn("<ExperienceEntry> was created without expected prop 'org'");
    		}

    		if (/*role*/ ctx[1] === undefined && !('role' in props)) {
    			console.warn("<ExperienceEntry> was created without expected prop 'role'");
    		}

    		if (/*time*/ ctx[2] === undefined && !('time' in props)) {
    			console.warn("<ExperienceEntry> was created without expected prop 'time'");
    		}

    		if (/*description*/ ctx[3] === undefined && !('description' in props)) {
    			console.warn("<ExperienceEntry> was created without expected prop 'description'");
    		}
    	}

    	get org() {
    		throw new Error("<ExperienceEntry>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set org(value) {
    		throw new Error("<ExperienceEntry>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get role() {
    		throw new Error("<ExperienceEntry>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set role(value) {
    		throw new Error("<ExperienceEntry>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get time() {
    		throw new Error("<ExperienceEntry>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set time(value) {
    		throw new Error("<ExperienceEntry>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<ExperienceEntry>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<ExperienceEntry>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\sections\Experience.svelte generated by Svelte v3.48.0 */
    const file$4 = "src\\sections\\Experience.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (43:8) {#each work as e}
    function create_each_block_1(ctx) {
    	let div;
    	let experienceentry;
    	let t;
    	let current;

    	experienceentry = new ExperienceEntry({
    			props: {
    				org: /*e*/ ctx[2].org,
    				role: /*e*/ ctx[2].role,
    				time: /*e*/ ctx[2].time,
    				description: /*e*/ ctx[2].description
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(experienceentry.$$.fragment);
    			t = space();
    			attr_dev(div, "id", "entry");
    			attr_dev(div, "class", "svelte-m2ti6s");
    			add_location(div, file$4, 43, 8, 1526);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(experienceentry, div, null);
    			append_dev(div, t);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(experienceentry.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(experienceentry.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(experienceentry);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(43:8) {#each work as e}",
    		ctx
    	});

    	return block;
    }

    // (53:8) {#each education as e}
    function create_each_block$1(ctx) {
    	let div;
    	let experienceentry;
    	let t;
    	let current;

    	experienceentry = new ExperienceEntry({
    			props: {
    				org: /*e*/ ctx[2].org,
    				role: /*e*/ ctx[2].role,
    				time: /*e*/ ctx[2].time,
    				description: /*e*/ ctx[2].description
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(experienceentry.$$.fragment);
    			t = space();
    			attr_dev(div, "id", "entry");
    			attr_dev(div, "class", "svelte-m2ti6s");
    			add_location(div, file$4, 53, 8, 1803);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(experienceentry, div, null);
    			append_dev(div, t);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(experienceentry.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(experienceentry.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(experienceentry);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(53:8) {#each education as e}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div;
    	let h2;
    	let t1;
    	let section1;
    	let section0;
    	let t2;
    	let section3;
    	let section2;
    	let div_intro;
    	let current;
    	let each_value_1 = /*work*/ ctx[0];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
    		each_blocks_1[i] = null;
    	});

    	let each_value = /*education*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out_1 = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "My Experience";
    			t1 = space();
    			section1 = element("section");
    			section0 = element("section");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t2 = space();
    			section3 = element("section");
    			section2 = element("section");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h2, file$4, 39, 4, 1411);
    			attr_dev(section0, "id", "inner");
    			add_location(section0, file$4, 41, 8, 1469);
    			attr_dev(section1, "id", "outer");
    			add_location(section1, file$4, 40, 4, 1439);
    			attr_dev(section2, "id", "inner");
    			add_location(section2, file$4, 51, 8, 1741);
    			attr_dev(section3, "id", "outer");
    			add_location(section3, file$4, 50, 4, 1711);
    			attr_dev(div, "id", "experience");
    			attr_dev(div, "class", "svelte-m2ti6s");
    			add_location(div, file$4, 38, 0, 1375);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			append_dev(div, section1);
    			append_dev(section1, section0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(section0, null);
    			}

    			append_dev(div, t2);
    			append_dev(div, section3);
    			append_dev(section3, section2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(section2, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*work*/ 1) {
    				each_value_1 = /*work*/ ctx[0];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    						transition_in(each_blocks_1[i], 1);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						transition_in(each_blocks_1[i], 1);
    						each_blocks_1[i].m(section0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (dirty & /*education*/ 2) {
    				each_value = /*education*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(section2, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out_1(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks_1[i]);
    			}

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, scale, {});
    					div_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks_1 = each_blocks_1.filter(Boolean);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				transition_out(each_blocks_1[i]);
    			}

    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Experience', slots, []);

    	let work = [
    		{
    			org: "Ordnance Survey",
    			role: "Graduate Data Scientist",
    			time: "April 2022 - present",
    			description: "I've been doing some stuff, like I did this whole bunch of stuff by using stuff and stuff and applying it to stuff. Now I'm really good at stuff. Hire me and I'll do stuff."
    		},
    		{
    			org: "",
    			role: "Graduate Research Scientist",
    			time: "September 2021 - March 2022",
    			description: "I did some other stuff as well"
    		}
    	];

    	let education = [
    		{
    			org: "Durham University",
    			role: "M. Sc. (by research) Geography",
    			time: "2019-2021",
    			description: "I've been doing some stuff, like I did this whole bunch of stuff by using stuff and stuff and applying it to stuff. Now I'm really good at stuff. Hire me and I'll do stuff."
    		},
    		{
    			org: "",
    			role: "B. Sc. Geography",
    			time: "2016 - 2019",
    			description: "I did some other stuff as well"
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Experience> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		listen,
    		fade,
    		scale,
    		ExperienceEntry,
    		work,
    		education
    	});

    	$$self.$inject_state = $$props => {
    		if ('work' in $$props) $$invalidate(0, work = $$props.work);
    		if ('education' in $$props) $$invalidate(1, education = $$props.education);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [work, education];
    }

    class Experience extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Experience",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\components\WorkEntry.svelte generated by Svelte v3.48.0 */

    const file$3 = "src\\components\\WorkEntry.svelte";

    function create_fragment$3(ctx) {
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t0;
    	let h3;
    	let t1;
    	let t2;
    	let p;
    	let t3;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			h3 = element("h3");
    			t1 = text(/*title*/ ctx[1]);
    			t2 = space();
    			p = element("p");
    			t3 = text(/*description*/ ctx[2]);
    			attr_dev(img, "id", "headshot");
    			if (!src_url_equal(img.src, img_src_value = /*image*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*title*/ ctx[1] + " image");
    			attr_dev(img, "class", "svelte-ya5575");
    			add_location(img, file$3, 8, 4, 148);
    			attr_dev(div0, "id", "im-container");
    			attr_dev(div0, "class", "svelte-ya5575");
    			add_location(div0, file$3, 7, 4, 119);
    			attr_dev(h3, "class", "svelte-ya5575");
    			add_location(h3, file$3, 10, 4, 220);
    			attr_dev(p, "class", "svelte-ya5575");
    			add_location(p, file$3, 11, 4, 242);
    			attr_dev(div1, "id", "card");
    			attr_dev(div1, "class", "svelte-ya5575");
    			add_location(div1, file$3, 6, 0, 98);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div1, t0);
    			append_dev(div1, h3);
    			append_dev(h3, t1);
    			append_dev(div1, t2);
    			append_dev(div1, p);
    			append_dev(p, t3);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*image*/ 1 && !src_url_equal(img.src, img_src_value = /*image*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*title*/ 2 && img_alt_value !== (img_alt_value = /*title*/ ctx[1] + " image")) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty & /*title*/ 2) set_data_dev(t1, /*title*/ ctx[1]);
    			if (dirty & /*description*/ 4) set_data_dev(t3, /*description*/ ctx[2]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('WorkEntry', slots, []);
    	let { image } = $$props;
    	let { title } = $$props;
    	let { description } = $$props;
    	const writable_props = ['image', 'title', 'description'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<WorkEntry> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('image' in $$props) $$invalidate(0, image = $$props.image);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('description' in $$props) $$invalidate(2, description = $$props.description);
    	};

    	$$self.$capture_state = () => ({ image, title, description });

    	$$self.$inject_state = $$props => {
    		if ('image' in $$props) $$invalidate(0, image = $$props.image);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('description' in $$props) $$invalidate(2, description = $$props.description);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [image, title, description];
    }

    class WorkEntry extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { image: 0, title: 1, description: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WorkEntry",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*image*/ ctx[0] === undefined && !('image' in props)) {
    			console.warn("<WorkEntry> was created without expected prop 'image'");
    		}

    		if (/*title*/ ctx[1] === undefined && !('title' in props)) {
    			console.warn("<WorkEntry> was created without expected prop 'title'");
    		}

    		if (/*description*/ ctx[2] === undefined && !('description' in props)) {
    			console.warn("<WorkEntry> was created without expected prop 'description'");
    		}
    	}

    	get image() {
    		throw new Error("<WorkEntry>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set image(value) {
    		throw new Error("<WorkEntry>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<WorkEntry>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<WorkEntry>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<WorkEntry>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<WorkEntry>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\sections\Work.svelte generated by Svelte v3.48.0 */
    const file$2 = "src\\sections\\Work.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (28:8) {#each team_members as m}
    function create_each_block(ctx) {
    	let workentry;
    	let current;

    	workentry = new WorkEntry({
    			props: {
    				title: /*m*/ ctx[1].title,
    				description: /*m*/ ctx[1].description,
    				image: /*m*/ ctx[1].image
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(workentry.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(workentry, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(workentry.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(workentry.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(workentry, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(28:8) {#each team_members as m}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div1;
    	let h2;
    	let t1;
    	let div0;
    	let current;
    	let each_value = /*team_members*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h2 = element("h2");
    			h2.textContent = "My Work";
    			t1 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h2, file$2, 25, 4, 981);
    			attr_dev(div0, "class", "grid-container svelte-1sh6vm5");
    			add_location(div0, file$2, 26, 4, 1003);
    			attr_dev(div1, "class", "meet-the-team svelte-1sh6vm5");
    			add_location(div1, file$2, 24, 0, 948);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h2);
    			append_dev(div1, t1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*team_members*/ 1) {
    				each_value = /*team_members*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Work', slots, []);

    	let team_members = [
    		{
    			title: "SEE_ICE",
    			image: "images/SEE_ICE.PNG",
    			description: "During my masters I published a paper about using deep learning to classify satellite imagery containing marine-terminating glaciers in Greenland."
    		},
    		{
    			title: "OS Machine Learning Model Hub",
    			image: "images/model_hub_logo.PNG",
    			description: "I worked with the VisionAI and Research Teams at OS to create a model hub to facilitate ethical consideration, increase transparency and accountability, and reduce duplication of effort."
    		},
    		{
    			title: "Placeholder",
    			image: "http://www.fillmurray.com/g/200/300",
    			description: "This is a placeholder card for work I've done."
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Work> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ WorkEntry, team_members });

    	$$self.$inject_state = $$props => {
    		if ('team_members' in $$props) $$invalidate(0, team_members = $$props.team_members);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [team_members];
    }

    class Work extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Work",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\sections\About.svelte generated by Svelte v3.48.0 */
    const file$1 = "src\\sections\\About.svelte";

    function create_fragment$1(ctx) {
    	let div1;
    	let navbar;
    	let t0;
    	let div0;
    	let name;
    	let t1;
    	let p;
    	let t3;
    	let scrollarrow;
    	let t4;
    	let section0;
    	let experience;
    	let t5;
    	let section1;
    	let work;
    	let t6;
    	let scrolltotop;
    	let current;
    	navbar = new NavBar({ $$inline: true });
    	name = new Name({ $$inline: true });
    	scrollarrow = new ScrollArrow({ $$inline: true });
    	experience = new Experience({ $$inline: true });
    	work = new Work({ $$inline: true });
    	scrolltotop = new ScrollToTop({ $$inline: true });

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(navbar.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			create_component(name.$$.fragment);
    			t1 = space();
    			p = element("p");
    			p.textContent = "I'm Mel Marochov, a Graduate Data Scientist in the Rapid Prototyping Team at Ordnance Survey. I like skateboarding, wild swimming, and making stuff! I've been learning some pretty cool things from some pretty cool people, from a wee bit of Python to a fair amount of web development... but mainly just an outrageous number of keyboard shortcuts.";
    			t3 = space();
    			create_component(scrollarrow.$$.fragment);
    			t4 = space();
    			section0 = element("section");
    			create_component(experience.$$.fragment);
    			t5 = space();
    			section1 = element("section");
    			create_component(work.$$.fragment);
    			t6 = space();
    			create_component(scrolltotop.$$.fragment);
    			attr_dev(p, "id", "about");
    			attr_dev(p, "class", "svelte-bcu9eq");
    			add_location(p, file$1, 19, 4, 510);
    			attr_dev(div0, "id", "page-one");
    			attr_dev(div0, "class", "svelte-bcu9eq");
    			add_location(div0, file$1, 17, 4, 474);
    			attr_dev(div1, "class", "svelte-bcu9eq");
    			add_location(div1, file$1, 15, 0, 448);
    			attr_dev(section0, "id", "experience");
    			add_location(section0, file$1, 24, 0, 917);
    			attr_dev(section1, "id", "work");
    			add_location(section1, file$1, 28, 0, 977);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(navbar, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			mount_component(name, div0, null);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			append_dev(div1, t3);
    			mount_component(scrollarrow, div1, null);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, section0, anchor);
    			mount_component(experience, section0, null);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, section1, anchor);
    			mount_component(work, section1, null);
    			insert_dev(target, t6, anchor);
    			mount_component(scrolltotop, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbar.$$.fragment, local);
    			transition_in(name.$$.fragment, local);
    			transition_in(scrollarrow.$$.fragment, local);
    			transition_in(experience.$$.fragment, local);
    			transition_in(work.$$.fragment, local);
    			transition_in(scrolltotop.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbar.$$.fragment, local);
    			transition_out(name.$$.fragment, local);
    			transition_out(scrollarrow.$$.fragment, local);
    			transition_out(experience.$$.fragment, local);
    			transition_out(work.$$.fragment, local);
    			transition_out(scrolltotop.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(navbar);
    			destroy_component(name);
    			destroy_component(scrollarrow);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(section0);
    			destroy_component(experience);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(section1);
    			destroy_component(work);
    			if (detaching) detach_dev(t6);
    			destroy_component(scrolltotop, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('About', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		NavBar,
    		Name,
    		Scroll,
    		ScrollArrow,
    		ScrollToTop,
    		Experience,
    		Work
    	});

    	return [];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    const routes = {
        "/": About,
        "/experience": Experience,
        "/work": Work
    };

    /* src\App.svelte generated by Svelte v3.48.0 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let router;
    	let current;
    	router = new Router({ props: { routes }, $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(router.$$.fragment);
    			attr_dev(main, "class", "svelte-1ycinj8");
    			add_location(main, file, 8, 0, 149);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(router, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(router);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Router, routes });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
