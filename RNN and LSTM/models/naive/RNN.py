import numpy as np
import torch
import torch.nn as nn


class VanillaRNN(nn.Module):
    """ An implementation of vanilla RNN using Pytorch Linear layers and activations.
        You will need to complete the class forward function.
    """

    def __init__(self, input_size, hidden_size, output_size):
        """ Init function for VanillaRNN class
            Args:
                input_size (int): the number of features in the inputs.
                hidden_size (int): the size of the hidden layer
                output_size (int): the size of the output layer

            Returns:
                None
        """
        super(VanillaRNN, self).__init__()

        self.input_size = input_size
        self.hidden_size = hidden_size
        self.output_size = output_size
        self.W_hh = torch.nn.Parameter(torch.zeros((self.hidden_size, self.hidden_size)))
        self.W_xh = torch.nn.Parameter(torch.zeros((self.input_size, self.hidden_size)))
        self.W_hy = torch.nn.Parameter(torch.zeros((self.hidden_size, self.output_size)))
        self.Bh = torch.nn.Parameter(torch.zeros((self.hidden_size)))
        self.By = torch.nn.Parameter(torch.zeros((self.output_size)))
        self.tanh = nn.Tanh()
        self.init_hidden()

    def init_hidden(self):
        for p in self.parameters():
            if p.data.ndimension() >= 2:
                nn.init.xavier_uniform_(p.data)
            else:
                nn.init.zeros_(p.data)

    def forward(self, x, hidden):
        """ The forward function of the Vanilla RNN
            Args:
                x (tensor): a batch of data of shape (batch_size, input_size) at one time step
                hidden (tensor): the hidden value of previous time step of shape (batch_size, hidden_size)

            Returns:
                output (FloatTensor): the output tensor of shape (output_size, batch_size)
                hidden (FloatTensor): the hidden value of current time step of shape (hidden_size, batch_size)
        """

        output = None

        #############################################################################
        # TODO:                                                                     #
        #   Implement the forward pass for the Vanilla RNN. Note that we are only   #
        #   going over one time step. Please refer to the structure in the notebook.##
        ############################################################################
        N, H = hidden.shape
        h_mul = np.matmul(hidden.detach().numpy(), self.W_hh.detach().numpy())
        x_mul = np.matmul(x.detach().numpy(), self.W_xh.detach().numpy())
        hidden = np.tanh(h_mul + x_mul + np.tile(self.Bh.detach().numpy(), (N, 1)))
        output = np.matmul(hidden, self.W_hy.detach().numpy()) + self.By.detach().numpy()

        #############################################################################
        #                              END OF YOUR CODE                             #
        #############################################################################
        return  torch.FloatTensor(output), torch.FloatTensor(hidden)
