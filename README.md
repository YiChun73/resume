# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Contact form

The contact section submits through [Web3Forms](https://web3forms.com) (no backend required).

1. Go to <https://web3forms.com>, enter the inbox address that should receive messages, and copy the access key sent to you.
2. Paste it into `.env` as `VITE_WEB3FORMS_ACCESS_KEY`.

The access key is public by design (it only identifies the receiving inbox), so `.env` is committed and the key ships in the client bundle. Until a real key is configured, submitting the form shows the error alert.
