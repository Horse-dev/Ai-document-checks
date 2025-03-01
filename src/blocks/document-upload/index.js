/**
 * Document Upload Block
 */
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, RangeControl, TextControl, ToggleControl } = wp.components;

// Register the block
registerBlockType("document-classification/document-upload", {
  title: __("Document Upload", "document-classification-plugin"),
  icon: "media-document",
  category: "widgets",
  keywords: [
    __("document", "document-classification-plugin"),
    __("upload", "document-classification-plugin"),
    __("classification", "document-classification-plugin"),
  ],
  attributes: {
    blockId: {
      type: "string",
      default: "",
    },
    acceptedFileTypes: {
      type: "array",
      default: [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"],
    },
    maxFileSize: {
      type: "number",
      default: 10,
    },
  },

  // Edit function
  edit: function (props) {
    const { attributes, setAttributes } = props;
    const { blockId, acceptedFileTypes, maxFileSize } = attributes;

    // Set a unique ID for this block if not already set
    if (!blockId) {
      setAttributes({
        blockId:
          "docclass-upload-" + Math.random().toString(36).substring(2, 9),
      });
    }

    // Handle file type changes
    const updateFileTypes = (fileType, isChecked) => {
      let newTypes = [...acceptedFileTypes];

      if (isChecked && !newTypes.includes(fileType)) {
        newTypes.push(fileType);
      } else if (!isChecked && newTypes.includes(fileType)) {
        newTypes = newTypes.filter((type) => type !== fileType);
      }

      setAttributes({ acceptedFileTypes: newTypes });
    };

    return [
      // Block inspector controls
      <InspectorControls key="inspector">
        <PanelBody
          title={__(
            "Document Upload Settings",
            "document-classification-plugin",
          )}
          initialOpen={true}
        >
          <RangeControl
            label={__(
              "Maximum File Size (MB)",
              "document-classification-plugin",
            )}
            value={maxFileSize}
            onChange={(value) => setAttributes({ maxFileSize: value })}
            min={1}
            max={50}
          />

          <p>{__("Accepted File Types:", "document-classification-plugin")}</p>

          <ToggleControl
            label={__("PDF Files (.pdf)", "document-classification-plugin")}
            checked={acceptedFileTypes.includes(".pdf")}
            onChange={(isChecked) => updateFileTypes(".pdf", isChecked)}
          />

          <ToggleControl
            label={__(
              "Word Documents (.doc, .docx)",
              "document-classification-plugin",
            )}
            checked={
              acceptedFileTypes.includes(".doc") &&
              acceptedFileTypes.includes(".docx")
            }
            onChange={(isChecked) => {
              updateFileTypes(".doc", isChecked);
              updateFileTypes(".docx", isChecked);
            }}
          />

          <ToggleControl
            label={__(
              "Images (.jpg, .jpeg, .png)",
              "document-classification-plugin",
            )}
            checked={
              acceptedFileTypes.includes(".jpg") &&
              acceptedFileTypes.includes(".jpeg") &&
              acceptedFileTypes.includes(".png")
            }
            onChange={(isChecked) => {
              updateFileTypes(".jpg", isChecked);
              updateFileTypes(".jpeg", isChecked);
              updateFileTypes(".png", isChecked);
            }}
          />
        </PanelBody>
      </InspectorControls>,

      // Block preview in editor
      <div key="preview" className="docclass-document-upload-editor">
        <div className="docclass-document-upload-placeholder">
          <div className="docclass-icon">
            <span className="dashicons dashicons-media-document"></span>
          </div>
          <div className="docclass-title">
            {__("Document Upload Field", "document-classification-plugin")}
          </div>
          <div className="docclass-description">
            {__(
              "Users will be able to upload documents here. The system will automatically classify them.",
              "document-classification-plugin",
            )}
          </div>
          <div className="docclass-settings-summary">
            <p>
              {__("Max file size:", "document-classification-plugin")}{" "}
              {maxFileSize}MB |
              {__("Accepted types:", "document-classification-plugin")}{" "}
              {acceptedFileTypes.join(", ")}
            </p>
          </div>
        </div>
      </div>,
    ];
  },

  // Save function (we're using a dynamic block, so this just returns null)
  save: function () {
    return null;
  },
});
