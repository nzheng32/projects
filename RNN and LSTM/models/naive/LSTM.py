import numpy as np
import torch
import torch.nn as nn


class LSTM(nn.Module):
    # An implementation of naive LSTM using Pytorch Linear layers and activations
    # You will need to complete the class forward function.

    def __init__(self, input_size, hidden_size):
        """ Init function for VanillaRNN class
            Args:
                input_size (int): the number of features in the inputs.
                hidden_size (int): the size of the hidden layer
            Returns:
                None
        """
        super(LSTM, self).__init__()

        self.input_size = input_size
        self.hidden_size = hidden_size

        # i_t, the input gate
        self.W_ii = nn.Parameter(torch.Tensor(input_size, hidden_size))
        self.b_ii = nn.Parameter(torch.Tensor(hidden_size))
        self.W_hi = nn.Parameter(torch.Tensor(hidden_size, hidden_size))
        self.b_hi = nn.Parameter(torch.Tensor(hidden_size))

        # f_t, the forget gate
        self.W_if = nn.Parameter(torch.Tensor(input_size, hidden_size))
        self.b_if = nn.Parameter(torch.Tensor(hidden_size))
        self.W_hf = nn.Parameter(torch.Tensor(hidden_size, hidden_size))
        self.b_hf = nn.Parameter(torch.Tensor(hidden_size))

        # g_t, the cell gate
        self.W_ig = nn.Parameter(torch.Tensor(input_size, hidden_size))
        self.b_ig = nn.Parameter(torch.Tensor(hidden_size))
        self.W_hg = nn.Parameter(torch.Tensor(hidden_size, hidden_size))
        self.b_hg = nn.Parameter(torch.Tensor(hidden_size))

        # o_t, the output gate
        self.W_io = nn.Parameter(torch.Tensor(input_size, hidden_size))
        self.b_io = nn.Parameter(torch.Tensor(hidden_size))
        self.W_ho = nn.Parameter(torch.Tensor(hidden_size, hidden_size))
        self.b_ho = nn.Parameter(torch.Tensor(hidden_size))


        self.init_hidden()

    def init_hidden(self):
        for p in self.parameters():
            if p.data.ndimension() >= 2:
                nn.init.xavier_uniform_(p.data)
            else:
                nn.init.zeros_(p.data)

    def forward(self, x: torch.Tensor, init_states=None):
        """Assumes x is of shape (batch, sequence, feature)"""

        ################################################################################
        # TODO:                                                                        #
        #   Implement the forward pass of LSTM. Please refer to the equations in the   #
        #   corresponding section of jupyter notebook. If init_states is None, you     #
        #   should initialize h_t and c_t to be zero vectors.                          #
        ################################################################################
        N, D, d = x.shape
        H = self.hidden_size
        if init_states == None: 
            h_t, c_t = np.zeros((N, H)), np.zeros((N, H))

        # activation vector
        for d in range(D):
            x_slice = x[:, d, :]
            m = nn.Sigmoid()
            a = np.matmul(x_slice.detach().numpy(),self.W_ii.detach().numpy()) + self.b_ii.detach().numpy() + np.matmul(h_t, self.W_hi.detach().numpy()) + self.b_hi.detach().numpy()
            i = m(torch.FloatTensor(a))
            b = np.matmul(x_slice.detach().numpy(),self.W_if.detach().numpy()) + np.matmul(h_t, self.W_hf.detach().numpy()) + self.b_hf.detach().numpy() + self.b_if.detach().numpy()
            f = m(torch.FloatTensor(b))
            c = np.matmul(x_slice.detach().numpy(),self.W_io.detach().numpy()) + np.matmul(h_t,self.W_ho.detach().numpy()) + self.b_io.detach().numpy() + self.b_ho.detach().numpy()
            o = m(torch.FloatTensor(c))
            d = np.matmul(x_slice.detach().numpy(),self.W_ig.detach().numpy()) + np.matmul(h_t,self.W_hg.detach().numpy()) + self.b_hg.detach().numpy() + self.b_ig.detach().numpy()
            g = np.tanh(d)

            c_t = f * c_t + i * g
            c_t = c_t.detach().numpy() 
            h_t = o * np.tanh(c_t)
            h_t = h_t.detach().numpy()
        c_t = torch.FloatTensor(c_t)
        h_t = torch.FloatTensor(h_t)
        
        ################################################################################
        #                              END OF YOUR CODE                                #
        ################################################################################
        return (h_t, c_t)

