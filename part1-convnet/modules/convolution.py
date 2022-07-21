import numpy as np

class Conv2D:
    '''
    An implementation of the convolutional layer. We convolve the input with out_channels different filters
    and each filter spans all channels in the input.
    '''
    def __init__(self, in_channels, out_channels, kernel_size=3, stride=1, padding=0):
        '''
        :param in_channels: the number of channels of the input data
        :param out_channels: the number of channels of the output(aka the number of filters applied in the layer)
        :param kernel_size: the specified size of the kernel(both height and width)
        :param stride: the stride of convolution
        :param padding: the size of padding. Pad zeros to the input with padding size.
        '''
        self.in_channels = in_channels
        self.out_channels = out_channels
        self.kernel_size = kernel_size
        self.stride = stride
        self.padding = padding

        self.cache = None

        self._init_weights()

    def _init_weights(self):
        np.random.seed(1024)
        self.weight = 1e-3 * np.random.randn(self.out_channels, self.in_channels,  self.kernel_size, self.kernel_size)
        self.bias = np.zeros(self.out_channels)

        self.dx = None
        self.dw = None
        self.db = None

    def forward(self, x):
        '''
        The forward pass of convolution
        :param x: input data of shape (N, C, H, W)
        :return: output data of shape (N, self.out_channels, H', W') where H' and W' are determined by the convolution
                 parameters. Save necessary variables in self.cache for backward pass
        '''
        out = None
        #############################################################################
        # TODO: Implement the convolution forward pass.                             #
        # Hint: 1) You may use np.pad for padding.                                  #
        #       2) You may implement the convolution with loops                     #
        #############################################################################
        N,C,H,W = x.shape
        stride = self.stride
        pad = self.padding
        size = self.kernel_size
        out = np.zeros((N, self.out_channels, int((H + 2 * pad - size) / stride + 1), int((W + 2 * pad - size) / stride + 1)))
        x_pad = np.pad(x, ((0, 0), (0, 0), (pad, pad), (pad, pad)))
        for i in range(N):
            for j in range(self.out_channels):
                for q in range(0, 1 + H + 2 * pad - size, stride):
                    for p in range(0, 1 + W + 2 * pad - size, stride):
                            w_tmp = self.weight[j,:,:,:]
                            x_tmp = x_pad[i, :, q:(q + size), p:(p + size)]
                            conv = np.sum(np.multiply(w_tmp, x_tmp))
                            out[i, j, int(q/stride), int(p/stride)] = conv + self.bias[j]
        #############################################################################
        #                              END OF YOUR CODE                             #
        #############################################################################
        self.cache = x
        return out

    def backward(self, dout):
        '''
        The backward pass of convolution
        :param dout: upstream gradients
        :return: nothing but dx, dw, and db of self should be updated
        '''
        x = self.cache
        #############################################################################
        # TODO: Implement the convolution backward pass.                            #
        # Hint:                                                                     #
        #       1) You may implement the convolution with loops                     #
        #       2) don't forget padding when computing dx                           #
        #############################################################################
        x = self.cache
        N,C,H,W = x.shape
        stride = self.stride
        pad = self.padding
        size = self.kernel_size
        x_pad = np.pad(x, ((0, 0), (0, 0), (pad, pad), (pad, pad)))
        dx_pad = np.zeros(x_pad.shape)
        dw = np.zeros((self.out_channels, C, size, size))
        db = dout.sum(0).sum(1).sum(1) ##
        for i in range(N):
            for j in range(self.out_channels):
                for q in range(0, 1 + H + 2 * pad - size, stride):
                    for p in range(0, 1 + W + 2 * pad - size, stride):
                        pos_h = int(q/stride)
                        pos_w = int(p/stride)
                        sub_x = x_pad[i, :, q:(q + size), p:(p + size)]
                        sub_grad = dout[i, j, pos_h, pos_w]
                        sub_w = self.weight[j,:,:,:]
                        dw[j,:,:,:] = dw[j,:,:,:] + sub_x * sub_grad
                        dx_pad[i, :, q:(q + size), p:(p + size)] = dx_pad[i, :, q:(q + size), p:(p + size)] +  sub_w * sub_grad

        self.dx = dx_pad[:, :, pad:(pad + H), pad:(pad + W)]
        self.dw = dw
        self.db = db

        
        #############################################################################
        #                              END OF YOUR CODE                             #
        #############################################################################