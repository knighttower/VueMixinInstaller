// // -----------------------------------------
// /**
//  * @knighttower
//  * @url knighttower.io
//  * @git https://github.com/knighttower/
//  * @license MIT and CC (https://creativecommons.org/licenses/by/4.0/)
//  * @version 1.0.0
//  * Attribution: @Carroll Bradford
//  * @change log
//  * - 1.0.0 - Converted to typescript and vanilla js
//  */
// // -----------------------------------------

/**
 * Supports both, Options & Composition API
 * Use to install mixins that can work with both APIs
 * @mixin installMixin
 * @param {Object} object Mixin object
 * @param {String} name Register name to be used as
 * @example
 * In Application
 * 1. Import your mixin into your app
 *    import { installMixin } from 'VueMixinInstaller'; //import into your app
 * 2. register your mixin with the application
 *    app.use(installMixin(ExampleMixinObject<object>, 'NameThatWillBeAssignedToYourMixin'<string>)); //registers your mixin
 * Or Inside your mixin
 *  1. Import into your mixin and use like this
 *      import { installMixin } from 'VueMixinInstaller'; //import into your mixin
 *      // ... your mixin code here
 *      export default installMixin(ExampleMixinObject, 'ExportTableHelper'); //exports your mixin
 * 2. Import into your app and use like this
 *      import ExampleMixinObject from '@/mixins/ExampleMixinObject'; //import into your app
 *      app.use(ExampleMixinObject); //registers your mixin
 * 3. Use in your component like this
 *     In Option API: this.YourMixinMethod()
 *     In Composition API: const { YourMixinMethod } = inject('YourMixinMethod');
 *     Or In Composition API: const CustomName = inject('YourMixinMethod'); then CustomName.YourMixinMethod()
 *  
 * @returns {Object} Registration instance used by VUE
 */
export const installMixin = function (object: Record<string, any>, name: string): any {
    return {
        install: (app: any, options?: any) => {
            // Support for Options API in Vue 2 and 3
            Object.entries(object).forEach(([key, value]) => {
                app.config.globalProperties[key] = value;
            });

            // Support for Composition API only in Vue 3
            app.provide(name, object);
        },
    };
};
