import discountCodes from "@/app/data/discountCodes";

const calcDiscountFunction = (code, totalBill) => {
  const discountCode = discountCodes.find(c => c.code === code);
  if (!discountCode) {
    return { error: 'Try FLAT10/PREC10/FLAT20/PREC20', discount: 0 };
  }

  let totalDiscount = 0;
  if (discountCode.type === 'flat') {
    totalDiscount = discountCode.magnitude;
  } else if (discountCode.type === 'percentage') {
    totalDiscount = (totalBill * discountCode.magnitude) / 100;
  }

  return { error: '', discount: totalDiscount };
};

export default calcDiscountFunction;
