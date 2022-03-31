<template>
  <div>
    <SfHeading
      :level="4"
      :title="$t('Payment method')"
      class="sf-heading--left sf-heading--no-underline title shipping__title"
    />
    <SfRadio
      v-e2e="'payment-method'"
      v-for="method in paymentMethods"
      :key="method.value"
      :label="method.label"
      :value="method.value"
      :description="method.description"
      :selected ="selectedMethod"
      name="shippingMethod"
      class="form__radio shipping"
      @input="selectMethod(method.value)"
    >
      <div class="shipping__label">
        {{ method.label }}
      </div>
    </SfRadio>
  </div>
</template>

<script>
import { SfButton, SfRadio, SfHeading } from '@storefront-ui/vue';
import { ref, onMounted } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { useCart } from '@realtainment/sylius';
export default {
  name: 'VsfPaymentProvider',

  components: {
    SfButton,
    SfRadio,
    SfHeading
  },

  setup(props, { emit }) {
    const { $sylius } = useVSFContext();
    const { cart } = useCart();

    const paymentMethods = ref([]);
    const selectedMethod = ref(null);

    const updatePayment = (code) => {
      const paymentMethod = {
        orderTokenValue: cart.value.tokenValue,
        paymentMethodCode: code,
        paymentId: String(cart.value.payments._id)
      };
      $sylius.api.updateCartPayment({ paymentMethod });
    };

    const selectMethod = (method) => {
      selectedMethod.value = method;
      updatePayment(method);
      emit('status');
    };

    onMounted(async () => {
      selectedMethod.value = cart.value.payments ? cart.value.payments.method.code : null;
      if (selectedMethod.value) {
        emit('status');
        updatePayment(selectedMethod.value);
      }
      paymentMethods.value = await $sylius.api.getPaymentMethods();
    });

    return {
      paymentMethods,
      selectedMethod,
      selectMethod
    };
  }
};
</script>

<style lang="scss" scoped>
.shipping {
  &__title {
    margin-top: 30px;
  }

  &__label {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}
</style>
