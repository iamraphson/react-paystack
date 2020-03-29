import React, { useState, useEffect } from 'react';

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
//# sourceMappingURL=paystack-script.js.map

function usePaystackPayment(options) {
    var _a = usePaystackScript(), scriptLoaded = _a[0], scriptError = _a[1];
    var publicKey = options.publicKey, email = options.email, amount = options.amount, reference = options.reference, _b = options.metadata, metadata = _b === void 0 ? {} : _b, _c = options.currency, currency = _c === void 0 ? 'NGN' : _c, channels = options.channels, _d = options.label, label = _d === void 0 ? '' : _d, _e = options.plan, plan = _e === void 0 ? '' : _e, _f = options.quantity, quantity = _f === void 0 ? '' : _f, _g = options.subaccount, subaccount = _g === void 0 ? '' : _g, _h = options.transaction_charge, transaction_charge = _h === void 0 ? 0 : _h, _j = options.bearer, bearer = _j === void 0 ? 'account' : _j;
    var initializePayment = function (callback, onClose) {
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
            };
            //@ts-ignore
            var handler = window.PaystackPop && window.PaystackPop.setup(paystackArgs);
            handler && handler.openIframe();
        }
    };
    useEffect(function () {
        if (scriptError) {
            throw new Error('Unable to load paystack inline script');
        }
    }, [scriptError]);
    return initializePayment;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

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

export { PaystackButton, usePaystackPayment };
//# sourceMappingURL=index.es.js.map
