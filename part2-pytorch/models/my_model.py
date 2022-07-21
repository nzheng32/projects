import torch
import torch.nn as nn

# You will re-use the contents of this file for your eval-ai submission.

class MyModel(nn.Module):
    # You can use pre-existing models but change layers to recieve full credit.
    def __init__(self):
        super(MyModel, self).__init__()
        #############################################################################
        # TODO: Initialize the network weights                                      #
        #############################################################################
        self.conv = nn.Conv2d(in_channels = 3,out_channels = 64, 
        kernel_size = 5, stride=1, padding=0) 
        self.relu = nn.ReLU()
        self.maxpool = nn.MaxPool2d(kernel_size = 2, stride=2)

        self.norm1 = nn.BatchNorm2d(64)

        self.conv2= nn.Conv2d(in_channels = 64,out_channels = 256, 
        kernel_size = 3, stride=1, padding=0) 
        self.relu2 = nn.ReLU()
        self.maxpool2 = nn.MaxPool2d(kernel_size = 2, stride=2)

        self.norm2 = nn.BatchNorm2d(256)
        
        self.fc = nn.Linear(36864, 10)
        self.norm13 = nn.BatchNorm1d(10)
        self.fc2 = nn.Linear(10, 10)
        #############################################################################
        #                              END OF YOUR CODE                             #
        #############################################################################

    def forward(self, x):
        outs = None
        #############################################################################
        # TODO: Implement forward pass of the network                               #
        #############################################################################
        x = self.conv(x)
        x = self.norm1(x)
        x = self.relu(x)
        x = self.maxpool(x)

        x = self.conv2(x)
        x = self.norm2(x)
        x = self.relu2(x)
        
        x = x.reshape([x.shape[0],-1])
        outs = self.fc(x)
        outs = self.norm13(outs)
        outs = self.fc2(outs)
        #############################################################################
        #                              END OF YOUR CODE                             #
        #############################################################################
        return outs