<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string
    /** submitted field name (also helps browser autofill) */
    name: string
    /** visually hidden label, doubles as the placeholder */
    label: string
    type?: 'text' | 'email'
    /** render a textarea instead of an input */
    multiline?: boolean
    // `| undefined` so callers can pass a possibly-absent validation message
    // straight through under exactOptionalPropertyTypes
    error?: string | undefined
  }>(),
  { type: 'text', multiline: false, error: '' },
)

const model = defineModel<string>({ required: true })
</script>

<template>
  <div class="form-group">
    <label class="visually-hidden" :for="id">{{ label }}</label>
    <textarea
      v-if="multiline"
      :id="id"
      v-model="model"
      :name="name"
      class="form-control"
      rows="5"
      :placeholder="label"
      required
      :aria-invalid="Boolean(error)"
      :aria-describedby="`${id}-error`"
    />
    <input
      v-else
      :id="id"
      v-model="model"
      :name="name"
      :type="type"
      class="form-control"
      :placeholder="label"
      required
      :aria-invalid="Boolean(error)"
      :aria-describedby="`${id}-error`"
    />
    <div :id="`${id}-error`" class="help-block">{{ error }}</div>
  </div>
</template>

<style scoped lang="scss">
// reserve the line so a validation message doesn't shift the layout
.help-block {
  min-height: 20px;
}
</style>
