
<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <SfHeading
      v-e2e="'shipping-heading'"
      :level="3"
      :title="$t('Shipping')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfCheckbox
      v-e2e="'copy-address'"
      :selected="sameAsBilling"
      @change="handleCheckSameAddress"
      :label="$t('Copy address data from billing')"
      name="copyBillingAddress"
      class="form__element"
    />
    <form @submit.prevent="handleSubmit(handleFormSubmit)">
      <UserAddresses
        v-if="isAuthenticated && hasSavedShippingAddress"
        :addresses="userShipping"
        :addressGetters="userShippingGetters"
        @setCurrentAddress="handleSetCurrentAddress"
      />
      <div class="form">
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
          name="state"
          slim
        >
          <SfInput
            v-e2e="'billing-state'"
            v-model="form.state"
            label="State/Province"
            name="state"
            class="form__element form__element--half form__element--half-even"
          />
        </ValidationProvider>
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

        <ValidationProvider
          name="phoneNumber"
          rules="required|digits:9"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-phone'"
            v-model="form.phoneNumber"
            label="Phone number"
            name="phoneNumber"
            class="form__element"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <div class="form">
        <div class="form__action">
          <SfButton
            v-if="!isFormSubmitted"
            class="sf-button color-secondary form__back-button"
            type="button"
            @click="$router.push(localePath({ name: 'billing' }))"
          >
            {{ $t('Go back') }}
          </SfButton>
          <SfButton
            v-e2e="'select-shipping'"
            v-if="!isFormSubmitted"
            :disabled="loading"
            class="form__action-button"
            type="submit"
          >
            {{ $t('Select shipping method') }}
          </SfButton>
        </div>
      </div>
      <VsfShippingProvider
        v-if="isFormSubmitted"
        :shipping-methods="shippingMethods"
        @submit="$router.push(localePath({ name: 'payment' }))"
        @cancel="isFormSubmitted = false;"
      />
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfCheckbox
} from '@storefront-ui/vue';
import { ref, computed, onMounted } from '@vue/composition-api';
import { useUiNotification } from '~/composables/';
import { useBilling, useShipping, useUserShipping, userShippingGetters, useUser } from '@realtainment/sylius';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { onSSR, useVSFContext } from '@vue-storefront/core';

extend('required', {
  ...required,
  message: 'This field is required'
});
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});
extend('digits', {
  ...digits,
  message: 'Please provide a valid phone number'
});

export default {
  name: 'Shipping',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver,
    UserAddresses: () => import('@/components/Checkout/UserAddresses'),
    VsfShippingProvider: () => import('~/components/Checkout/VsfShippingProvider')
  },
  setup () {
    const isFormSubmitted = ref(false);
    const sameAsBilling = ref(false);
    const countries = ref([]);
    const shippingMethods = ref([]);

    const { send } = useUiNotification();
    const { $sylius } = useVSFContext();
    const { load, save, loading, shipping } = useShipping();
    const { shipping: userShipping, load: loadUserShipping } = useUserShipping();
    const { isAuthenticated, user } = useUser();
    const { billing } = useBilling();

    const form = ref({
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      state: '',
      countryCode: '',
      postcode: '',
      email: null,
      phoneNumber: null
    });

    const handleFormSubmit = async () => {
      await save({ shippingDetails: form.value });

      shippingMethods.value = await $sylius.api.getShippingMethods({
        zone: form.value.countryCode
      });

      if (shippingMethods.value.length) {
        isFormSubmitted.value = true;
        return;
      }

      send({ type: 'danger', message: 'No shipping methods are available for selected country. Please choose a different country.'});
    };

    const handleCheckSameAddress = async () => {
      sameAsBilling.value = !sameAsBilling.value;
      if (sameAsBilling.value) {
        form.value = {
          ...form.value,
          ...billing.value
        };
      }
    };

    const handleSetCurrentAddress = (address) => {
      form.value = {
        ...form.value,
        ...address
      };
    };

    const hasSavedShippingAddress = computed(() => {
      if (!isAuthenticated.value || !userShipping.value) {
        return false;
      }
      const addresses = userShippingGetters.getAddresses(userShipping.value);
      return Boolean(addresses?.length);
    });

    onSSR(async () => {
      await load();
      countries.value = await $sylius.api.getCountries();
    });

    onMounted(async () => {
      if (!countries.value.length) {
        countries.value = await $sylius.api.getCountries();
      }
      if (shipping.value) form.value = shipping.value;
      if (isAuthenticated.value) {
        form.value.email = user.value.email ?? null;
        await loadUserShipping();
      }
    });

    return {
      loading,
      isFormSubmitted,
      isAuthenticated,
      sameAsBilling,
      form,
      shippingMethods,
      userShipping,
      userShippingGetters,
      countries,
      hasSavedShippingAddress,
      handleSetCurrentAddress,
      handleFormSubmit,
      handleCheckSameAddress
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  --button-width: 100%;
  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 0;
      color: var(--c-text);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    --button-width: auto;
  }
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
        text-align: left;
      }
    }
    &--add-address {
      width: 100%;
      margin: 0;
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 var(--spacer-sm);
    &:hover {
      color:  var(--c-white);
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}

.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }
  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}

.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
</style>
