<template>
  <form
    ref="formref"
    :id="blok._uid"
    :action="blok.formEndpoint"
    class="flex flex-wrap"
    :class="blok.class"
    method="post"
    name="contact"
    data-netlify="true"
    netlify
    @submit.prevent="formSubmit"
  >
    <input type="hidden" name="form-name" value="contact" />
    <div
      v-for="(inputField, i) in blok.inputs"
      :key="inputField.name"
      v-editable="inputField"
      class="transition-all transform translate-y-5 opacity-0 inview-child:opacity-100 inview-child:translate-y-0 pointer-events-auto"
      :style="{ transitionDelay : (i + 1) * 150 + 'ms'}"
      :class="inputField.wrapperClass"
    >
      <label :for="inputField._uid" :class="inputField.fieldLabelClass">
        {{ inputField.label }}
      </label>
      <textarea 
        v-if="inputField.type === 'textarea'"
        :id="inputField._uid"
        v-model="v$[inputField.name].$model"
        :name="inputField.name"
        :placeholder="inputField.placeholder"
        class="mt-2 h-24 text-white p-2 font-retro text-sm outline-none bg-transparent border border-white focus:bg-white focus:text-black transition-colors"
        :class="{
          [inputField.fieldClass]: true,
          [inputField.fieldErrorClass]: v$[inputField.name].$error,
        }"
        :rows="parseInt(inputField.rows) || 1"></textarea>
      <input
        v-else
        :id="inputField._uid"
        v-model="v$[inputField.name].$model"
        :type="inputField.type"
        :name="inputField.name"
        :placeholder="inputField.placeholder"
        class="mt-2 h-7 text-white p-2 font-retro text-sm outline-none bg-transparent border border-white focus:bg-white focus:text-black transition-colors"
        :class="{
          [inputField.fieldClass]: true,
          [inputField.fieldErrorClass]: v$[inputField.name].$error,
        }"
      />
      <div v-if="v$[inputField.name].$error" class="">
        <div
          v-for="{ component, errorMessage } in inputField.validators"
          :key="component"
          :class="inputField.warningClass"
          class="font-retro text-sm text-red-600"
        >
          <div v-if="v$[inputField.name][component]">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="!formSubmitted"
      type="submit"
      :disabled="formSubmitting"
      :form="blok._uid"
      class="px-6 py-2 font-retro text-white bg-transparent mt-8 mx-auto border border-white hover:bg-white hover:text-black transition-colors disabled:bg-gray-500 pointer-events-auto"
      :class="blok.submitButtonClass"
    >
      {{ blok.submitButtonText }}
    </button>
    <div v-else ref="shuffle" class="mt-4 max-w-xs">{{ blok.formSubmittedText }}</div>
  </form>
</template>
<script setup>
import useVuelidate from "@vuelidate/core";
import * as validators from "@vuelidate/validators";
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
const formref = ref(null);
const formSubmitted = ref(false);
const formSubmitting = ref(false);
const form = reactive(
  props.blok.inputs.reduce(
    (prevFields, inputField) => ({
      ...prevFields,
      [inputField.name]: "",
    }),
    {}
  )
);
const fieldRules = computed(() =>
  props.blok.inputs.reduce(
    (prevFields, inputField) => ({
      ...prevFields,
      [inputField.name]: generateFieldRules(inputField.validators),
    }),
    {}
  )
);
const generateFieldRules = (fieldValidators) => {
  return fieldValidators.reduce(
    (prevValidators, validator) => ({
      ...prevValidators,
      [validator.component]: validator.param
        ? validators[validator.component](validator.param)
        : validators[validator.component],
    }),
    {}
  );
};
const formSubmit = (e) => {
  if (v$.value.$invalid) {
    v$.value.$touch();
  }
  else {
    const formData = new FormData(formref.value);
    formSubmitting.value = true;
    $fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
    .then(() => {
      formSubmitted.value = true;
      formSubmitting.value = false;
    })
    .catch((error) => {
      alert(error);
      formSubmitting.value = false;
    });
  }
};
const v$ = useVuelidate(fieldRules.value, form);
</script>
