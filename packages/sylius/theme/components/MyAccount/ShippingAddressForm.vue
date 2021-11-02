<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      id="shipping-details-form"
      class="form"
      @submit.prevent="handleSubmit(submitForm)"
    >
      <div class="form__horizontal">
        <ValidationProvider
        name="firstName"
        rules="required|min:2"
        v-slot="{ errors }"
        slim
      >
        <SfInput
          v-e2e="'billing-firstName'"
          v-model="form.firstName"
          label="First name"
          name="firstName"
          class="form__element form__element--half"
          required
          :valid="!errors[0]"
          :errorMessage="errors[0]"
        />
        </ValidationProvider>
        <ValidationProvider
          name="lastName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-lastName'"
            v-model="form.lastName"
            label="Last name"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <div class="form__horizontal">
        <ValidationProvider
          name="street"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-streetName'"
            v-model="form.street"
            label="Street name"
            name="street"
            class="form__element"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <div class="form__horizontal">
        <ValidationProvider
          name="city"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-city'"
            v-model="form.city"
            label="City"
            name="city"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>

        <ValidationProvider
          name="zipCode"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-zipcode'"
            v-model="form.postcode"
            label="Zip-code"
            name="zipCode"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <div class="form__horizontal">
        <ValidationProvider
          name="countryCode"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            v-e2e="'billing-country'"
            v-model="form.countryCode"
            label="Country"
            name="countryCode"
            class="form__element form__element--half form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="countryOption in countries"
              :key="countryOption.key"
              :value="countryOption.key"
            >
              {{ countryOption.label }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
      </div>
      <div class="form__horizontal">
        <ValidationProvider
        name="phoneNumber"
        rules="required|min:9"
        v-slot="{ errors }"
        slim
      >
        <SfInput
          v-e2e="'billing-phone'"
          v-model="form.phoneNumber"
          label="Phone number"
          name="phoneNumber"
          class="form__element form__element--half form__element--half-even"
          required
          :valid="!errors[0]"
          :errorMessage="errors[0]"
        />
      </ValidationProvider>
      </div>

      <SfButton class="form__button">
        {{ isNew ? $t('Add the address') : $t('Update the address') }}
      </SfButton>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfInput,
  SfButton,
  SfSelect,
  SfCheckbox
} from '@storefront-ui/vue';
import { required, min, oneOf } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { reactive } from '@vue/composition-api';
const COUNTRIES = [
  { key: 'US', label: 'United States' },
  { key: 'UK', label: 'United Kingdom' },
  { key: 'IT', label: 'Italy' },
  { key: 'PL', label: 'Poland' }
];
extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});

extend('oneOf', {
  ...oneOf,
  message: 'Invalid country'
});

export default {
  name: 'ShippingAddressForm',

  components: {
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver
  },

  props: {
    address: {
      type: Object,
      default: () => ({
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        postcode: '',
        countryCode: '',
        phoneNumber: ''
      })
    },
    isNew: {
      type: Boolean,
      required: true
    }
  },

  setup(props, { emit }) {
    const form = reactive({
      id: props.address.id,
      firstName: props.address.firstName,
      lastName: props.address.lastName,
      street: props.address.street,
      city: props.address.city,
      postcode: props.address.postcode,
      countryCode: props.address.countryCode,
      phoneNumber: props.address.phoneNumber
    });

    const submitForm = () => {
      emit('submit', {
        form,
        onComplete: () => {

        },
        // TODO: Handle Error
        onError: () => {}
      });
    };

    return {
      form,
      submitForm,
      countries: COUNTRIES
    };
  }
};
</script>

<style lang='scss' scoped>
.form {
  &__element {
    display: block;
    margin-bottom: var(--spacer-base);
  }
  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    flex-wrap: wrap;
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      // margin: 0;
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }
  &__button {
    display: block;
    margin-top: var(--spacer-lg);
  }
  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: var(--spacer-lg);
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
