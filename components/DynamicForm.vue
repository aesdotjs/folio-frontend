<template>
  <form
    :id="blok._uid"
    :action="blok.formEndpoint"
    class="flex flex-wrap"
    :class="blok.class"
    method="post"
    @submit="formSubmit"
  >
    <div
      v-for="inputField in blok.inputs"
      :key="inputField.name"
      v-editable="inputField"
      :class="inputField.wrapperClass"
    >
      <label :for="inputField._uid" :class="inputField.fieldLabelClass">
        {{ inputField.label }}
      </label>
       <input
        :id="inputField._uid"
        v-model="form[inputField.name]"
        :type="inputField.type"
        :name="inputField.name"
        :placeholder="inputField.placeholder"
        :class="{
          [inputField.fieldClass]: true,
          [inputField.fieldErrorClass]: v$[inputField.name].$error,
        }"
      />
      <div v-if="v$[inputField.name].$error" class="h-6">
        <div
          v-for="{ component, errorMessage } in inputField.validators"
          :key="component"
          :class="inputField.warningClass"
        >
          <div v-if="!v$[inputField.name][component]">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
    <button type="submit" :form="blok._uid" :class="blok.submitButtonClass">
      {{ blok.submitButtonText }}
    </button>
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
console.log(props.blok);
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
  if (v$.form.$invalid) {
    v$.form.$touch();
    e.preventDefault();
  }
};
const v$ = useVuelidate(fieldRules.value, form);
console.log(v$)
</script>
