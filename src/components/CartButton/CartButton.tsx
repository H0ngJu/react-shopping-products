import { AddCart, MinusCart } from '@/assets/index';
import { ButtonImg, CartButtonContentWrapper } from './CartButton.style';
import { QuantityPicker, Button } from '@/components/index';
import {
  useCartItemStatus,
  usePostCartItem,
  useFetchCartItems,
  useDeleteCartItem,
} from '@/hooks/index';
import { useTheme } from '@emotion/react';

interface CartButtonProps {
  productId: number;
}

const CartButton: React.FC<CartButtonProps> = ({ productId }) => {
  const { isInCart } = useCartItemStatus(productId);
  const { cartItemList } = useFetchCartItems();
  const { addToCartMutation } = usePostCartItem();
  const { deleteCartMutation } = useDeleteCartItem();
  const { quantity } = useCartItemStatus(productId);
  const { colors } = useTheme();

  const cartItem = cartItemList.find(
    (cartItem) => cartItem.product.id === productId,
  );

  const handleRemoveCartItem = () => {
    if (cartItem) {
      deleteCartMutation.mutate(cartItem.id);
    }
  };

  const handleAddCartItem = () => {
    addToCartMutation.mutate(productId);
  };

  if (cartItem && quantity > 0) {
    return (
      <QuantityPicker
        cartItemId={cartItem.id}
        productId={productId}
        isAutoDelete
      />
    );
  }

  return (
    <Button
      color={!isInCart ? colors.white : colors.black}
      backgroundColor={isInCart ? colors.gray : colors.black}
      onClick={isInCart ? handleRemoveCartItem : handleAddCartItem}
    >
      <CartButtonContentWrapper>
        <ButtonImg src={isInCart ? MinusCart : AddCart} />
        <span>{isInCart ? '빼기' : '담기'}</span>
      </CartButtonContentWrapper>
    </Button>
  );
};

export default CartButton;
