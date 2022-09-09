<template>
  <ValidationObserver v-slot="{ handleSubmit, reset }">
    <form class="form" @submit.prevent="handleSubmit(submitForm(reset))">
      <ValidationProvider rules="required" v-slot="{ errors }" class="form__element">
        <SfInput
          v-model="form.title"
          type="text"
          name="title"
          label="Title"
          required
          :valid="!errors[0]"
          :errorMessage="errors[0]"
        />
      </ValidationProvider>

      <ValidationProvider rules="required" v-slot="{ errors }" class="form__element">
        <SfInput
          v-model.number="form.rating"
          type="number"
          label="Rating (1-5)"
          min="1"
          max="5"
          required
          :valid="!errors[0]"
          :errorMessage="errors[0]"
        />
      </ValidationProvider>

      <ValidationProvider rules="required" v-slot="{ errors }" class="form__element">
        <SfTextarea
          v-model="form.comment"
          label="Comment"
          cols="30"
          rows="5"
          required
        >
        </SfTextarea>
      </ValidationProvider>
      <SfButton class="form__button">{{ $t('Save') }}</SfButton>
    </form>
  </ValidationObserver>
</template>

<script>
import { ref } from '@vue/composition-api';
import { SfTextarea, SfInput, SfButton } from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
export default {
  name: 'AddReviewForm',
  components: {
    SfTextarea,
    SfInput,
    SfButton,
    ValidationObserver,
    ValidationProvider
  },
  props: {
    productId: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const resetForm = () => ({
      title: null,
      comment: null,
      reviewSubject: props.productId,
      rating: null
    });
    const form = ref(resetForm());
    const submitForm = (resetValidationFn) => {
      console.log(form.value);
      return () => {
        const onComplete = () => {
          form.value = resetForm();
          resetValidationFn();
        };

        const onError = () => {
          // TODO: Handle error
        };

        emit('submit', { form, onComplete, onError });
      };
    };

    return {
      form,
      submitForm
    };
  }
};
</script>
