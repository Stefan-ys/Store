import React from 'react';

const TransferProductsPrompt = ({ onTransfer, onCancel }) => {
  return (
    <div className="transfer-products-prompt">
      <h3>Transfer Products</h3>
      <p>You have products in your temporary cart. Do you want to transfer them to your shopping cart?</p>
      <button onClick={onTransfer}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
};

export default TransferProductsPrompt;
