import numpy as np

class MaxPooling:
    '''
    Max Pooling of input
    '''
    def __init__(self, kernel_size, stride):
        self.kernel_size = kernel_size
        self.stride = stride
        self.cache = None
        self.dx = None

    def forward(self, x):
        '''
        Forward pass of max pooling
        :param x: input, (N, C, H, W)
        :return: The output by max pooling with kernel_size and stride
        '''
        out = None
        #############################################################################
        # TODO: Implement the max pooling forward pass.                             #
        # Hint:                                                                     #
        #       1) You may implement the process with loops                         #
        #############################################################################
        N, C, H, W = x.shape
        stride = self.stride
        H_out = self.kernel_size
        W_out = self.kernel_size
        out = np.zeros((N, C, int(H/stride), int(W/stride)))
        for i in range(N):
            for j in range(C):
                for q in range(0, H - H_out + 1, stride):
                    for p in range(0, W - W_out + 1, stride):
                        x_tmp = x[i, j, q:(q+H_out), p:(p+W_out)]
                        out[i, j, int(q/stride), int(p/stride)] = np.max(x_tmp) 
        
        #############################################################################
        #                              END OF YOUR CODE                             #
        #############################################################################
        self.cache = (x, H_out, W_out)
        return out

    def backward(self, dout):
        '''
        Backward pass of max pooling
        :param dout: Upstream derivatives
        :return:
        '''
        x, H_out, W_out = self.cache
        #############################################################################
        # TODO: Implement the max pooling backward pass.                            #
        # Hint:                                                                     #
        #       1) You may implement the process with loops                     #
        #       2) You may find np.unravel_index useful                             #
        #############################################################################
        stride = self.stride
        N, C, H, W = x.shape
        dx = np.zeros(x.shape)
        for i in range(N):
            for j in range(C):
                for q in range(0, H - H_out + 1, stride):
                    for p in range(0, W - H_out + 1, stride):
                        xp = x[i, j, q:(q+H_out), p:(p+W_out)]
                        max = np.argmax(xp)
                        h, w = np.unravel_index(max, (H_out, W_out))
                        dx[i, j, q+h, p+w] = dout[i, j, int(q/stride), int(p/stride)]
        self.dx = dx

        
        #############################################################################
        #                              END OF YOUR CODE                             #
        #############################################################################
