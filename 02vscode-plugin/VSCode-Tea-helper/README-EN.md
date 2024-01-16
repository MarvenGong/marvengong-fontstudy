> 

# VSCode-Tea-Helper

> VSCode-Tea-Helper is a VS Code extension for Tea.

Tea is a great library. More and more projects use it. So, For helping developer write more efficient by tea, VSCode-Tea-Helper is born.

## Feature

* Document

* Autocomplete

	support jsx, html and js language

* Snippets


## Document

### Usage

1 - Move cursor to render function of jsx file

2 - Press default hot key `ctrl + cmd + z`(windows: `ctrl + win + z`) or 
    Press ⇧⌘P to bring up the Command Palette and then input `tea-helper.search`

3 - Show document view If complete matching,
    or you should select tag you want to search

4 - Enter and trigger document browser

<!-- ![document](https://user-images.githubusercontent.com/1659577/27990775-4b7db888-6494-11e7-9b27-3ec7fa5f99b7.gif) -->

<!-- ### Version, Quotes, Indentation size and Language Switching

1 - Enter `Preferences` -> `setting` or shortcut `cmd` + `,`

2 - Modify language, version or indentation size
```javascript
  "element-helper.language": "zh-CN",
  "element-helper.version": "1.3",
  "element-helper.indent-size": 2,
  "element-helper.quotes": "double",    // html vue qoutes
  "element-helper.pug-quotes": "single" // jade/pug quotes
``` -->

### Auto Update Mechanism

Document is off-line and auto synchronize with Tea official site.

<!-- ### Keymap

Default hot key is  `ctrl + cmd + z`( windows: `ctrl + win + z`). If it has conflicted with other software's hot key. You can customize it. see [keybindings](https://code.visualstudio.com/docs/getstarted/keybindings#_keyboard-shortcuts-editor) -->


<!-- ## Autocomplete

![autocomplete](https://user-images.githubusercontent.com/1659577/27990774-4b7b3662-6494-11e7-83a4-9e6ed3ef698a.gif)

* Distinguish and auto complete property and method for every Element-UI tag

* Prompt value when value is some special type like Boolean or ICON. -->


## Snippets

![snippets](https://fastmock.cn-bj.ufileos.com/tea-snippets.gif)

> ps:前缀规则是tea+组件或则方法的单词

Support snippets list:

* `teabutton`

  ```
  <Button type="primary" style={style}>
    主要按钮
  </Button>
  ```

* `teaic`

  ```
  <Icon
    type={type}
    size="s"
    style={{ margin: "0 10px 10px 0", cursor: "pointer" }}
  />
  ```

* `tearow`

  ```
  <Row>
    <Col span={24}>
      <Box>col-24</Box>
    </Col>
  </Row>
  ```

* `teacol`

  ```
  <Col span={24}>
    <Box>col-24</Box>
  </Col>
  ```

* `teabreadcumb`

  ```
  <Breadcrumb>
    <Breadcrumb.Item>
      <a href="">Home</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href="">Application</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>About</Breadcrumb.Item>
  </Breadcrumb>
  ```

* `teatab`

  ```
  <Tabs tabs={tabs} placement={verticalSwitch.value ? "left" : "top"}>
    <p>当前选项卡：</p>
    <TabPanel id="basic">基本信息</TabPanel>
    <TabPanel id="network">性网卡</TabPanel>
    <TabPanel id="monitor">基本信息</TabPanel>
    <TabPanel id="sg">安全组</TabPanel>
    <TabPanel id="oplog">操作日志</TabPanel>
  </Tabs>
  ```
...

## Contribution

Your pull request will make VSCode-Tea-Helper better.

## LICENSE

MIT

