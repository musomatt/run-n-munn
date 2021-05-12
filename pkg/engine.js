
let wasm;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
*/
export class Bullet {

    static __wrap(ptr) {
        const obj = Object.create(Bullet.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_bullet_free(ptr);
    }
    /**
    * @returns {Vec2}
    */
    get position() {
        var ret = wasm.__wbg_get_bullet_position(this.ptr);
        return Vec2.__wrap(ret);
    }
    /**
    * @param {Vec2} arg0
    */
    set position(arg0) {
        _assertClass(arg0, Vec2);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_bullet_position(this.ptr, ptr0);
    }
    /**
    * @returns {boolean}
    */
    get is_destroyed() {
        var ret = wasm.__wbg_get_bullet_is_destroyed(this.ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set is_destroyed(arg0) {
        wasm.__wbg_set_bullet_is_destroyed(this.ptr, arg0);
    }
    /**
    * @returns {Vec2}
    */
    get direction() {
        var ret = wasm.__wbg_get_bullet_direction(this.ptr);
        return Vec2.__wrap(ret);
    }
    /**
    * @param {Vec2} arg0
    */
    set direction(arg0) {
        _assertClass(arg0, Vec2);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_bullet_direction(this.ptr, ptr0);
    }
    /**
    */
    update() {
        wasm.bullet_update(this.ptr);
    }
    /**
    * @param {Vec2} munn_position
    * @param {Vec2} direction
    */
    constructor(munn_position, direction) {
        _assertClass(munn_position, Vec2);
        var ptr0 = munn_position.ptr;
        munn_position.ptr = 0;
        _assertClass(direction, Vec2);
        var ptr1 = direction.ptr;
        direction.ptr = 0;
        var ret = wasm.bullet_new(ptr0, ptr1);
        return Bullet.__wrap(ret);
    }
}
/**
*/
export class Bullets {

    static __wrap(ptr) {
        const obj = Object.create(Bullets.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_bullets_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.bullets_new();
        return Bullets.__wrap(ret);
    }
    /**
    * @param {Vec2} munn_position
    * @param {Vec2} direction
    */
    push(munn_position, direction) {
        _assertClass(munn_position, Vec2);
        var ptr0 = munn_position.ptr;
        munn_position.ptr = 0;
        _assertClass(direction, Vec2);
        var ptr1 = direction.ptr;
        direction.ptr = 0;
        wasm.bullets_push(this.ptr, ptr0, ptr1);
    }
    /**
    */
    update() {
        wasm.bullets_update(this.ptr);
    }
    /**
    * @param {number} from_x
    * @param {number} to_x
    * @param {number} from_y
    * @param {number} to_y
    * @param {Function} action
    */
    on_collision(from_x, to_x, from_y, to_y, action) {
        try {
            wasm.bullets_on_collision(this.ptr, from_x, to_x, from_y, to_y, addBorrowedObject(action));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {Function} action
    */
    for_each(action) {
        try {
            wasm.bullets_for_each(this.ptr, addBorrowedObject(action));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
/**
*/
export class Munn {

    static __wrap(ptr) {
        const obj = Object.create(Munn.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_munn_free(ptr);
    }
    /**
    * @returns {Vec2}
    */
    get position() {
        var ret = wasm.__wbg_get_bullet_position(this.ptr);
        return Vec2.__wrap(ret);
    }
    /**
    * @param {Vec2} arg0
    */
    set position(arg0) {
        _assertClass(arg0, Vec2);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_bullet_position(this.ptr, ptr0);
    }
    /**
    * @returns {Vec2}
    */
    get velocity() {
        var ret = wasm.__wbg_get_bullet_direction(this.ptr);
        return Vec2.__wrap(ret);
    }
    /**
    * @param {Vec2} arg0
    */
    set velocity(arg0) {
        _assertClass(arg0, Vec2);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_bullet_direction(this.ptr, ptr0);
    }
    /**
    * @returns {Vec2}
    */
    get gravity() {
        var ret = wasm.__wbg_get_munn_gravity(this.ptr);
        return Vec2.__wrap(ret);
    }
    /**
    * @param {Vec2} arg0
    */
    set gravity(arg0) {
        _assertClass(arg0, Vec2);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_munn_gravity(this.ptr, ptr0);
    }
    /**
    * @returns {boolean}
    */
    get is_jumping() {
        var ret = wasm.__wbg_get_munn_is_jumping(this.ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set is_jumping(arg0) {
        wasm.__wbg_set_munn_is_jumping(this.ptr, arg0);
    }
    /**
    */
    constructor() {
        var ret = wasm.munn_new();
        return Munn.__wrap(ret);
    }
    /**
    * @param {number} dx
    * @param {number} dy
    */
    move_by(dx, dy) {
        wasm.munn_move_by(this.ptr, dx, dy);
    }
    /**
    * @param {number} dt
    */
    update(dt) {
        wasm.munn_update(this.ptr, dt);
    }
    /**
    * @param {Vec2} position
    * @returns {boolean}
    */
    can_move_to(position) {
        _assertClass(position, Vec2);
        var ret = wasm.munn_can_move_to(this.ptr, position.ptr);
        return ret !== 0;
    }
}
/**
*/
export class Vec2 {

    static __wrap(ptr) {
        const obj = Object.create(Vec2.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vec2_free(ptr);
    }
    /**
    * @returns {number}
    */
    get x() {
        var ret = wasm.__wbg_get_vec2_x(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set x(arg0) {
        wasm.__wbg_set_vec2_x(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get y() {
        var ret = wasm.__wbg_get_vec2_y(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set y(arg0) {
        wasm.__wbg_set_vec2_y(this.ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    is_in_bounds() {
        var ret = wasm.vec2_is_in_bounds(this.ptr);
        return ret !== 0;
    }
    /**
    * @returns {boolean}
    */
    is_grounded() {
        var ret = wasm.vec2_is_grounded(this.ptr);
        return ret !== 0;
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    constructor(x, y) {
        var ret = wasm.vec2_new(x, y);
        return Vec2.__wrap(ret);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('engine_bg.wasm', import.meta.url);
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_bullet_new = function(arg0) {
        var ret = Bullet.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_call_ba36642bd901572b = function() { return handleError(function (arg0, arg1) {
        var ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_3fc07b7d5fc9022d = function() { return handleError(function (arg0, arg1, arg2) {
        var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }



    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

export default init;

