import React, { useState, useEffect, createContext, forwardRef, useContext } from 'react';

var cachedScripts = [];
function usePaystackScript() {
    var src = 'https://js.paystack.co/v1/inline.js';
    var _a = useState({
        loaded: false,
        error: false,
    }), state = _a[0], setState = _a[1];
    useEffect(function () {
        if (cachedScripts.includes(src)) {
            setState({
                loaded: true,
                error: false,
            });
        }
        else {
            cachedScripts.push(src);
            var script_1 = document.createElement('script');
            script_1.src = src;
            script_1.async = true;
            var onScriptLoad_1 = function () {
                setState({
                    loaded: true,
                    error: false,
                });
            };
            var onScriptError_1 = function () {
                var index = cachedScripts.indexOf(src);
                if (index >= 0)
                    cachedScripts.splice(index, 1);
                script_1.remove();
                setState({
                    loaded: true,
                    error: true,
                });
            };
            script_1.addEventListener('load', onScriptLoad_1);
            script_1.addEventListener('complete', onScriptLoad_1);
            script_1.addEventListener('error', onScriptError_1);
            document.body.appendChild(script_1);
            return function () {
                script_1.removeEventListener('load', onScriptLoad_1);
                script_1.removeEventListener('error', onScriptError_1);
            };
        }
    }, [src]);
    return [state.loaded, state.error];
}

var callPaystackPop = function (paystackArgs) {
    //@ts-ignore
    var handler = window.PaystackPop && window.PaystackPop.setup(paystackArgs);
    handler && handler.openIframe();
};

function usePaystackPayment(options) {
    var _a = usePaystackScript(), scriptLoaded = _a[0], scriptError = _a[1];
    var publicKey = options.publicKey, firstname = options.firstname, lastname = options.lastname, phone = options.phone, email = options.email, amount = options.amount, reference = options.reference, _b = options.metadata, metadata = _b === void 0 ? {} : _b, _c = options.currency, currency = _c === void 0 ? 'NGN' : _c, channels = options.channels, _d = options.label, label = _d === void 0 ? '' : _d, _e = options.plan, plan = _e === void 0 ? '' : _e, _f = options.quantity, quantity = _f === void 0 ? '' : _f, _g = options.subaccount, subaccount = _g === void 0 ? '' : _g, _h = options.transaction_charge, transaction_charge = _h === void 0 ? 0 : _h, _j = options.bearer, bearer = _j === void 0 ? 'account' : _j, split = options.split, split_code = options.split_code;
    function initializePayment(callback, onClose) {
        if (scriptError) {
            throw new Error('Unable to load paystack inline script');
        }
        if (scriptLoaded) {
            var paystackArgs = {
                callback: callback ? callback : function () { return null; },
                onClose: onClose ? onClose : function () { return null; },
                key: publicKey,
                ref: reference,
                email: email,
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                amount: amount,
                currency: currency,
                plan: plan,
                quantity: quantity,
                'data-custom-button': options['data-custom-button'] || '',
                channels: channels,
                subaccount: subaccount,
                transaction_charge: transaction_charge,
                bearer: bearer,
                label: label,
                metadata: metadata,
                split: split,
                split_code: split_code,
            };
            callPaystackPop(paystackArgs);
        }
    }
    useEffect(function () {
        if (scriptError) {
            throw new Error('Unable to load paystack inline script');
        }
    }, [scriptError]);
    return initializePayment;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var PaystackButton = function (_a) {
    var text = _a.text, className = _a.className, children = _a.children, onSuccess = _a.onSuccess, onClose = _a.onClose, others = __rest(_a, ["text", "className", "children", "onSuccess", "onClose"]);
    var initializePayment = usePaystackPayment(others);
    return (React.createElement("button", { className: className, onClick: function () { return initializePayment(onSuccess, onClose); } }, text || children));
};

var PaystackContext = createContext({
    initializePayment: function () { return null; },
    onSuccess: function () { return null; },
    onClose: function () { return null; },
});

var PaystackProvider = function (_a) {
    var children = _a.children, onSuccess = _a.onSuccess, onClose = _a.onClose, others = __rest(_a, ["children", "onSuccess", "onClose"]);
    var initializePayment = usePaystackPayment(others);
    return (React.createElement(PaystackContext.Provider, { value: { initializePayment: initializePayment, onSuccess: onSuccess, onClose: onClose } }, children));
};

var PaystackConsumerChild = function (_a) {
    var children = _a.children, ref = _a.ref;
    var _b = useContext(PaystackContext), initializePayment = _b.initializePayment, onSuccess = _b.onSuccess, onClose = _b.onClose;
    var completeInitializePayment = function () { return initializePayment(onSuccess, onClose); };
    return children({ initializePayment: completeInitializePayment, ref: ref });
};
var PaystackConsumer = forwardRef(function (_a, ref) {
    var children = _a.children, paraSuccess = _a.onSuccess, paraClose = _a.onClose, others = __rest(_a, ["children", "onSuccess", "onClose"]);
    var onSuccess = paraSuccess ? paraSuccess : function () { return null; };
    var onClose = paraClose ? paraClose : function () { return null; };
    return (React.createElement(PaystackProvider, __assign({}, others, { onSuccess: onSuccess, onClose: onClose }),
        React.createElement(PaystackConsumerChild, { ref: ref }, children)));
});

export { PaystackButton, PaystackConsumer, usePaystackPayment };
//# sourceMappingURL=index.es.js.map
