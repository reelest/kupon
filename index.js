import { registerRootComponent } from "expo";
import btoa from "btoa";
import { Buffer } from "buffer";
import { TextEncoder, TextDecoder } from "util";
import 'formdata-polyfill/formdata.min.js'

global.btoa = btoa;
global.Buffer = Buffer;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
import App from "./App";
Error.stackTraceLimit = 40;

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
