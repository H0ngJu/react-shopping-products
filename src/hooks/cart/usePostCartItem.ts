import { addCartItem } from '@/api/cartItem';
import { cartKeys } from '@/constants/index';
import { useToast } from '@/hooks/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostCartItem = () => {
  const queryClient = useQueryClient();
  const { createToast } = useToast();

  const addToCartMutation = useMutation({
    mutationFn: (productId: number) => addCartItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.totalQuantity(),
      });
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
    onError: () => {
      createToast({
        message: '⛔️ 상품을 담는데 실패했습니다. 다시 시도해 주세요.',
        delayTime: 1_000 * 2,
      });
    },
  });

  return { addToCartMutation };
};

export default usePostCartItem;
